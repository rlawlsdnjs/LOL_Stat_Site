import { useEffect } from "react";
import axios from "axios";
import { userDataState, searchKeyState } from "../store/lol";
import { useRecoilState, useRecoilValue } from "recoil";

import LolSearchResult from "../components/lol/search/LolSearchResult";

const SearchLol = () => {
	const currentSearchKey = useRecoilValue(searchKeyState);
	const riotApi = import.meta.env.VITE_RIOT_API_KEY;
	const remote = axios.create();
	const [lolUser, setLolUser] = useRecoilState<any>(userDataState);

	// serverless functions 요청 소환사명 유무 확인

	const lolAllData = async () => {
		try {
			const userUrl =
				`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${currentSearchKey}` +
				"?api_key=" +
				riotApi;
			const userInfo = await remote.get(userUrl);
			const userAccountId = userInfo.data.accountId;
			const userPuuId = userInfo.data.puuid;
			const userId = userInfo.data.id;
			const userRankhUrl =
				`https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${userId}` +
				"?api_key=" +
				riotApi;
			const rankInfo = await remote.get(userRankhUrl);
			const matchInfo: any = await remote.get(
				`/api/lol/match/v5/matches/by-puuid/${userPuuId}/ids?start=0&count=20`,
				{
					headers: {
						"X-Riot-Token": riotApi,
					},
				}
			);

			const champInfoUrl =
				`https://kr.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${userId}` +
				"?api_key=" +
				riotApi;
			const champInfo = await remote.get(champInfoUrl);

			setLolUser({
				id: userInfo.data.id,
				userInfo: userInfo.data,
				rankInfo: rankInfo.data[0],
				matchInfo: matchInfo.data,
				mostChampInfo: champInfo.data[0].championId,
				puuID: userPuuId,
			});
		} catch (error) {
			console.log(`Error: ${error}`);
		}
	};

	useEffect(() => {
		const LolKeyword = "LolKeyword";
		if (currentSearchKey == "null") {
			return;
		} else {
			sessionStorage.setItem(LolKeyword, currentSearchKey);
			// 소환사명 유무 존재
			async function checkSummonerName(summonerName: string) {
				try {
					const userUrl = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${riotApi}`;
					const response = await axios.get(userUrl);
					const { data } = response;
					return true;
				} catch (error) {
					return false;
				}
			}
			async function exampleUsage() {
				const currentSearchKey = "소환사명";
				const isTrue = await checkSummonerName(currentSearchKey);
				console.log(isTrue);
			}
			exampleUsage();
			lolAllData();
		}
	}, [currentSearchKey]);

	return <>{currentSearchKey == "null" ? null : <LolSearchResult />} </>;
};

export default SearchLol;

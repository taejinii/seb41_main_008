/* eslint-disable */
import EthLogo from '../../assets/icons/eth-logo.png';
import customAxios from 'utils/api/axios';
import { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import '../Trending/Trending.css';

export interface Ranking {
  rank: number;
  collectionId: number;
  collectionName: string;
  coinId: number;
  coinName: string;
  totalVolume: number;
  highestPrice: number;
  logoImgName: string;
}

interface RankingData extends Array<Ranking> {}

const TrendingChart = ({ option }: { option: string }) => {
  const [data, setData] = useState<RankingData>();

  useEffect(() => {
    const getRaingkingData = async () => {
      try {
        const res = await customAxios.get(
          `/api/ranking/time/${option.toLowerCase()}`
        );
        setData(res.data);
      } catch (error) {
        const err = error as AxiosError;
        console.log(err);
      }
    };

    getRaingkingData();
  }, [option]);

  return (
    <div>
      <div className="top-collections">
        <div className="tCbox">
          {data?.map((topData) => {
            return (
              <div>
                <div className="inTCbox">
                  <div className="left"></div>
                  <span>{topData.rank}</span>
                  <div className="middle">
                    <div className="topImgAvatar">
                      <img
                        src={`${process.env.REACT_APP_IMAGE}${topData?.logoImgName}`}
                        alt=" "
                      />
                    </div>
                    <div className="mText">
                      <div className="topCollName">
                        {topData.collectionName}
                      </div>
                      <div className="priceTopColl">
                        <div className="fPtC">Floor price:</div>
                        <div className="pTopColl">
                          <img src={EthLogo} alt="EthLogo" />{' '}
                          {topData.totalVolume.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="right">
                    <span>{topData.coinName}</span>
                    <div className="pTopColl">
                      <img src={EthLogo} alt="EthLogo" />{' '}
                      {topData.highestPrice.toFixed(1)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TrendingChart;

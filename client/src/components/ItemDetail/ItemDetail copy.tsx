/* eslint-disable */
import { Link } from 'react-router-dom';
import { AxiosError } from 'axios';
import styled from 'styled-components';
import customAxios from 'utils/api/axios';
import ETHIcon from '../../assets/icons/PurchaseIcons/ETH';
import EyeIcon from '../../assets/icons/PurchaseIcons/Eye';
import HeartIcon from '../../assets/icons/PurchaseIcons/Heart';
import OfferIcon from '../../assets/icons/PurchaseIcons/Offer';
import TimeIcon from '../../assets/icons/PurchaseIcons/Time';
import './Buy.sass';
import { SlGraph } from 'react-icons/sl';
import { TbFileDescription } from 'react-icons/tb';
import BuyAndCartButton from '../CartButton/BuyAndCartButton';
import CountdownTimer from './CountDownTime/CountDown';
import { getItemsData } from 'utils/api/api';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAppSelector } from 'hooks/hooks';
import Rechart from './Rechart';
import { date } from 'yup';
import Header from 'components/Header/Header';
import Footer from 'components/Layout/Footer';

export interface ItemProps {
  coinId: number;
  coinName: string;
  collectionId: string;
  itemDescription: string;
  itemId: number;
  itemImageName: string;
  itemName: string;
  itemPrice: number;
  onSale: boolean;
  trueownerId: number;
  ownerName: string;
  priceHistory: PriceData[];
  tradeHistory: ItemsData[];
  withdrawFee: number;
  logoImgName: string;
  collectionName: string;
  coinImage: string;
}
interface ItemsData {
  sellerId: number;
  sellerName: string;
  buyerId: number;
  buyerName: string;
  transPrice: number;
  coinName: string;
  transDate: number;
}

interface PriceData {
  transPrice: number;
  transDate: number;
}

const ButtonWrapper = styled.div`
  div {
    border-radius: 8px;
  }
`;

const Asset = () => {
  const [data, setData] = useState<ItemProps>();
  const { itemId } = useParams();

  useEffect(() => {
    getItemsData(itemId).then((res) => setData(res.data));
  }, [itemId]);

  useEffect(() => {
    const getItemsData = async () => {
      try {
        const res = await customAxios.get(`/api/items/${itemId}`);
        setData(res.data);
        console.log(res.data);
      } catch (error) {
        const err = error as AxiosError;
        console.log(err);
      }
    };

    getItemsData();
  }, [itemId]);

  return (
    <div>
      <div className="asset mt-9 ">
        <div className="container">
          <div className=" border-2 border-sky-100">
            <div className=" flex border-2 border-yellow-500">
              <div className="">
                <div className="bg-w center flex p-1 h-12 w-full border border-gray-300 rounded-tl-lg rounded-tr-lg ;">
                  <img
                    className=" w-5 h-5 "
                    src={data?.coinImage}
                    alt="EthLogo"
                  />
                </div>
                <img
                  src={`${process.env.REACT_APP_IMAGE}${data?.itemImageName}`}
                  className="asset__image"
                  alt=""
                />
              </div>
              <div className=" ml-10 w-8/12 grow ">
                <h2>#{data?.itemId}</h2>
                <div className="text-4xl font-bold">{data?.collectionName}</div>
                <div className="asset__meta">
                  <div className="asset__meta__item">
                    Owned by{' '}
                    <Link to={`/collection/${itemId}`}>
                      <a>{data?.ownerName}</a>
                    </Link>
                  </div>
                  <div className="asset__meta__item">
                    <EyeIcon /> 0 views
                  </div>
                  <div className="asset__meta__item">
                    <HeartIcon /> 0 favorites
                  </div>
                </div>
                {/* {data?.onSale && ( */}
                <div className="card">
                  <div className="card__header">
                    <TimeIcon />
                    Sale ends january 31, 2023 at 23:59 UTC+9
                  </div>
                  <CountdownTimer />
                  <div className="card__body">
                    <div>
                      <div className="label">Current price</div>
                      <div className="asset__price">
                        <img
                          className=" w-4 h-4"
                          src={data?.coinImage}
                          alt="EthLogo"
                        />{' '}
                        <span>{data?.itemPrice}</span>
                      </div>
                    </div>
                    <ButtonWrapper>
                      <BuyAndCartButton data={data} />
                    </ButtonWrapper>
                  </div>
                </div>
                {/* )} */}
                <div className="card">
                  <div className="card__header">
                    <OfferIcon />
                    Trade History
                  </div>
                  <div className="card__body">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Price</th>
                          <th>Commission</th>
                          <th>Coin</th>
                          <th>From</th>
                          <th>To</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.tradeHistory.map((item) => (
                          <tr>
                            <td>
                              <div className="price">
                                <img
                                  className="w-3 h-3"
                                  src={data?.coinImage}
                                  alt="EthLogo"
                                />
                                {item.transPrice}
                              </div>
                            </td>
                            <td>{data?.withdrawFee}</td>
                            <td>{item.coinName}</td>
                            <td>{item.sellerName}</td>
                            <td>{item.buyerName}</td>
                            <td>{item.transDate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className=" w-5/12 border-2 border-pink-500">
              <div>
                <div className="card">
                  <div className="card__header border border-gray-100 bg-wite-500/100">
                    <TbFileDescription />
                    Description
                  </div>
                  <div className="card__body">
                    <div className="asset__properties"></div>
                    <div>{data?.itemDescription}</div>
                  </div>
                </div>
                <div className="card">
                  <div className="card__header">
                    <SlGraph />
                    Price History
                  </div>
                  <div className="card__body">
                    <div className="asset__properties"></div>
                    <div style={{ width: 500, height: 400 }}>
                      <Rechart data={data} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Header />
      <Footer />
    </div>
  );
};

export default Asset;

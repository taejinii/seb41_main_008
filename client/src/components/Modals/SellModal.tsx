import styled from 'styled-components';
import { ModalBack } from './CartingModal';
import { useAppSelector, useAppDispatch } from 'hooks/hooks';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { closeSell } from 'store/modalSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { getItemsData, getCoinPrice, sellItemHandler } from 'utils/api/api';
import { SubmitHandler, useForm } from 'react-hook-form';
import useModalClose from '../../hooks/useModalClose';

import { ItemProps } from 'components/ItemDetail/ItemDetail';

const SellModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  position: fixed;
  height: 800px;
  width: 450px;
  border-radius: 15px;
  z-index: 60;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  left: 0;
  right: 0;
  box-shadow: 4.8px 9.6px 9.6px hsl(0deg 0% 0% / 0.35);
`;

interface FormValue {
  itemPrice: number;
}
const SellModal = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState<ItemProps>();
  const [isCheckd, setIsChecked] = useState(false);
  const [coinPrice, setCoinPrice] = useState(0);
  const { sellOpen } = useAppSelector((state) => state.modal);
  const { itemId } = useAppSelector((state) => state.modal);
  const ref = useModalClose(sellOpen, closeSell());

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    resetField,
  } = useForm<FormValue>({ mode: 'onChange' });
  useEffect(() => {
    getItemsData(itemId).then((res) => setData(res.data));
  }, [itemId]);

  useEffect(() => {
    getCoinPrice(data?.coinName)
      .then((res: any) => setCoinPrice(res.data[0].trade_price))
      .catch((err) => console.log(err));
  }, [data?.coinName]);

  const onClickSubmit: SubmitHandler<FormValue> = (data) => {
    console.log(errors);
    if (totalPrice > 999999999999999) {
      alert('999999999999999₩ 을 초과할 수 없습니다');
      return;
    }
    if (window.confirm('판매하시겠습니까?')) {
      sellItemHandler(itemId, data).then(() => {
        setIsChecked(false);
        dispatch(closeSell());
        navigate(`/item/${itemId}`);
      });
    }
  };
  const totalPrice = coinPrice * watch('itemPrice');
  return (
    <>
      {sellOpen && <ModalBack ref={ref} zIndex={'50'} />}
      {sellOpen && (
        <SellModalContainer className="dark:bg-[#262b2e] dark:text-white">
          <form onSubmit={handleSubmit(onClickSubmit)} className="h-full">
            <header className="flex justify-between items-center w-full px-4 py-2 ">
              <h3 className="text-lg font-semibold">List for Sale</h3>
              <FontAwesomeIcon
                className="cursor-pointer"
                icon={faXmark}
                onClick={() => dispatch(closeSell())}
              />
            </header>
            <section>
              <div className="flex h-[450px]">
                <img
                  className="h-full w-full"
                  alt="nftimage"
                  src={`${process.env.REACT_APP_IMAGE}${data?.itemImageName}`}
                />
              </div>
              <div className="px-3 py-2">{data?.itemName}</div>

              <div className="px-3 font-bold">
                <div
                  className={`${
                    errors.itemPrice ? 'border-red-500 ' : ''
                  } ${'flex items-center rounded-xl border-2'}`}
                >
                  <input
                    type="text"
                    className={
                      'w-full p-2 outline-none rounded-l-lg dark:bg-[#3d3d41]'
                    }
                    required
                    {...register('itemPrice', {
                      pattern: /^[0-9.]*$/,
                    })}
                  />
                  <div className=" p-2  rounded-r-xl">{data?.coinName}</div>
                </div>
                {errors.itemPrice && (
                  <span className="text-red-500 text-sm">
                    Please enter vaild amount
                  </span>
                )}
                {totalPrice > 999999999999999 ? (
                  <div className="text-red-700 font-light">
                    Maximum Listing price is 999,999,999,999,999₩
                  </div>
                ) : (
                  <div className="truncate flex  flex-col">
                    <div className="flex justify-between">
                      <div>Service fee</div>
                      10%
                    </div>
                    <div className="flex justify-between">
                      <div>Listing price:</div>
                      {isNaN(totalPrice) ? '--' : totalPrice.toLocaleString()}₩
                    </div>
                    <div className="flex justify-between">
                      <div>Potential earning:</div>
                      {isNaN(totalPrice)
                        ? '--'
                        : (totalPrice - totalPrice * 0.1).toLocaleString()}
                      ₩
                    </div>
                  </div>
                )}
              </div>
            </section>
            <footer className="p-3">
              <div className="flex justify-center items-center mt-1 mb-1">
                <input
                  id="sellApprove"
                  type={'checkbox'}
                  required
                  onChange={(e) => {
                    setIsChecked(e.target.checked);
                  }}
                />
                <label htmlFor="sellApprove" className="text-xs ml-1 font-bold">
                  판매등록 후 에는 철회 불가합니다. 동의하십니까?
                </label>
              </div>
              <div>
                <button
                  disabled={isCheckd ? false : true}
                  className={`${'p-2 rounded-xl w-full bg-emerald-600 text-white hover:bg-emerald-500 font-bold'} ${
                    isCheckd ? 'bg-opacity-100' : 'bg-opacity-50'
                  }`}
                >
                  Sell
                </button>
              </div>
            </footer>
          </form>
        </SellModalContainer>
      )}
    </>
  );
};
export default SellModal;

import { PaymentOption } from '@/types';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { removeCart } from '../cartSlice';
import { cartItemsSelector } from '../selectors';
import '../styles.scss';
import CardOption from './CardOption';
import InputField from './InputField';

const defaultValues = {
  cardName: '',
  cardNumber: '',
  cvvNumber: '',
  expiryDate: '',
};

type CartInformation = typeof defaultValues;

export default function Card() {
  const navigate = useNavigate();
  const cartItems = useSelector(cartItemsSelector);
  const dispatch = useDispatch();
  const [option, setOption] = useState<PaymentOption>('visa');

  const { control, handleSubmit } = useForm({
    defaultValues: {
      cardName: '',
      cardNumber: '',
      cvvNumber: '',
      expiryDate: '',
    },
  });

  const handleChangeOption = (option: PaymentOption) => {
    setOption(option);
  };

  const handleFormSubmit = (data: CartInformation) => {
    if (!localStorage.getItem('user')) {
      toast.error('You must be login!');
      return;
    }

    if (cartItems.length === 0) {
      toast.error('Your cart is empty!');
    } else {
      console.log({
        cartInfo: {
          ...data,
          'card-type': option,
        },
        cartItems: cartItems,
      });
      toast.success('Check out successful!');
      dispatch(removeCart()); //remove cartItems in state and localStorage when check out successful
      navigate('/');
    }
  };

  return (
    <div className="card">
      <h3 className="card__title">Card Details</h3>
      <CardOption option={option} onChangeOption={handleChangeOption} />
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField
          name="cardName"
          control={control}
          rules={{ required: 'Card Name is missing!' }}
          type="text"
          label="Name on card"
          required
        />
        <InputField
          name="cardNumber"
          control={control}
          rules={{ required: 'Card Number is missing!' }}
          type="number"
          label="Card number"
          required
        />

        <div className="card__input__bottom">
          <InputField
            name="expiryDate"
            control={control}
            rules={{ required: 'Expiry date is missing!' }}
            type="date"
            label="Expiry date"
            required
            cardDate
          />
          <InputField
            name="cvvNumber"
            control={control}
            rules={{ required: 'CVV Number is missing!' }}
            type="number"
            label="CVV"
            required
          />
        </div>
        <button className="card__btn" type="submit">
          Check Out
        </button>
      </form>
    </div>
  );
}

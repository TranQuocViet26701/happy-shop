import { IMAGE_PLACEHOLDER, STATIC_HOST } from '@/constants';
import { utils } from '@/helpers';
import { CartItem } from '@/types';
import { RemoveCircleOutline } from '@mui/icons-material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, setQuantity } from './cartSlice';
import Card from './components/Card';
import { cartItemsSelector, cartTotalSelector } from './selectors';
import './styles.scss';

export default function CartFeature() {
  const cartTotal = useSelector(cartTotalSelector);
  const cartItems = useSelector(cartItemsSelector);
  const dispatch = useDispatch();

  const handleChangeQuantity = (item: CartItem, quantity: number) => {
    if (quantity !== 0) {
      const payload = {
        id: item.id,
        quantity: 0,
      };

      if (item.quantity === 1 && quantity < 0) payload.quantity = 1;
      else payload.quantity = item.quantity + quantity;
      dispatch(setQuantity(payload));
    } else {
      dispatch(removeFromCart(item.id));
    }
  };

  return (
    <div className="cart">
      <div className="cart__container">
        <div className="cart__left">
          <h2 className="cart__title">Shopping Cart</h2>
          <ul className="cart__items">
            {cartItems.map((item) => (
              <li key={item.id} className="cart__item">
                <Link
                  to={`/products/${item.id}`}
                  style={{ color: 'black', textDecoration: 'none' }}
                >
                  <div className="cart__item__title">
                    <img
                      src={
                        item.product.thumbnail?.url
                          ? `${STATIC_HOST}${item.product.thumbnail.url}`
                          : IMAGE_PLACEHOLDER
                      }
                      alt=""
                    />
                    <span>{item.product.name}</span>
                  </div>
                </Link>
                <div className="cart__item__quantity">
                  <RemoveCircleOutline
                    fontSize="small"
                    onClick={() => handleChangeQuantity(item, -1)}
                  />
                  <span>{item.quantity}</span>
                  <AddCircleOutlineIcon
                    fontSize="small"
                    onClick={() => handleChangeQuantity(item, 1)}
                  />
                </div>
                <span className="cart__item__price">
                  {utils.formatMoney(item.quantity * item.product.salePrice)}
                </span>
                <CloseIcon
                  fontSize="small"
                  onClick={() => handleChangeQuantity(item, 0)}
                />
              </li>
            ))}
          </ul>
          <div className="cart__footer">
            <div className="cart__return">
              <ArrowBackIcon fontSize="small" />
              <Link to="/products">Continue shopping</Link>
            </div>
            <div className="cart__subtotal">
              Subtotal:{' '}
              <span className="cart__price">
                {utils.formatMoney(cartTotal)}
              </span>
            </div>
          </div>
        </div>
        <div className="cart__right">
          <Card />
        </div>
      </div>
    </div>
  );
}

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import './styles.scss';

export default function CartFeature() {
  // const cartTotal = useSelector(cartTotalSelector);
  // const cartItems = useSelector(cartItemsSelector);
  // const dispatch = useDispatch();

  // const handleChangeQuantity = (item, quantity) => {
  //   if (quantity !== 0) {
  //     const payload = {
  //       id: item.id,
  //     };

  //     if (item.quantity === 1 && quantity < 0) payload.quantity = 1;
  //     else payload.quantity = item.quantity + quantity;
  //     dispatch(setQuantity(payload));
  //   } else {
  //     dispatch(removeFromCart(item.id));
  //   }
  // };

  return (
    <div className="cart">
      <div className="cart__container">
        <div className="cart__left">
          <h2 className="cart__title">Shopping Cart</h2>
          <ul className="cart__items">
            {/* {cartItems.map((item) => (
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
                  <RemoveIcon
                    fontSize="small"
                    onClick={() => handleChangeQuantity(item, -1)}
                  />
                  <span>{item.quantity}</span>
                  <AddIcon
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
            ))} */}
          </ul>
          <div className="cart__footer">
            <div className="cart__return">
              <ArrowBackIcon fontSize="small" />
              <Link to="/products">Continue shopping</Link>
            </div>
            <div className="cart__subtotal">
              Subtotal:{' '}
              <span className="cart__price">
                {/* {utils.formatMoney(cartTotal)} */}
              </span>
            </div>
          </div>
        </div>
        <div className="cart__right">{/* <Card /> */}</div>
      </div>
    </div>
  );
}

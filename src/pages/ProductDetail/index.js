import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getAllProducts,
  getOneProduct,
} from "../../features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { Carousel, Row, Col, Rate, Button, Divider } from "antd";
import {
  ProductDetailImage,
  ProductDetailInfo,
  ProductDetailInputNumber,
  ProductDetailReTitle,
  ProductDetailWrapper,
} from "./styles";
import ProductItem from "../../components/ProductItem";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.singleProduct) || null;
  const allProducts = useSelector((state) => state.product.allProducts) || null;
  const [value, setValue] = useState(1);

  useEffect(() => {
    dispatch(getOneProduct(id));
    dispatch(getAllProducts());
  }, [dispatch, id]);

  const handleAddButton = () => {
    var newCur = value;
    setValue(++newCur);
  };

  const handleDecreaseButton = () => {
    if (value === 1) {
      return;
    }
    var newCur = value;
    setValue(--newCur);
  };

  return (
    <ProductDetailWrapper>
      {product && product !== null && allProducts !== null && (
        <>
          <Row wrap={false}>
            <Col span={12}>
              <Carousel autoplay autoplaySpeed={2000}>
                {console.log(product.images)}
                {product.images.map((image) => (
                  <ProductDetailImage>
                    <img
                      src={`http://localhost:3500/api/picture${image}`}
                      alt=""
                    />
                  </ProductDetailImage>
                ))}
              </Carousel>
            </Col>
            <Col>
              <ProductDetailInfo>
                <div className="product-title">{product.name}</div>
                <div className="product-price-wrapper">
                  <div>
                    $
                    {product.discount &&
                    product.discount !== "New" &&
                    product.discount !== ""
                      ? product.price
                      : product.originPrice}
                  </div>
                  {product.discount && product.discount !== "New" && (
                    <div>${product.originPrice}</div>
                  )}
                  <Rate disabled defaultValue={product.rating} />
                </div>
                <div className="product-desc">
                  <div>{product.fullDesc.data.brief}</div>
                  <ul className="product-attr">
                    <li>{product.fullDesc.data.atrb1}</li>
                    <li>{product.fullDesc.data.atrb2}</li>
                    <li>{product.fullDesc.data.atrb3}</li>
                    <li>{product.fullDesc.data.atrb4}</li>
                  </ul>
                </div>
                <div>
                  <ProductDetailInputNumber
                    value={value}
                    controls={false}
                    addonBefore={
                      <Button
                        className="input-button"
                        onClick={handleDecreaseButton}
                      >
                        -
                      </Button>
                    }
                    addonAfter={
                      <Button
                        className="input-button"
                        onClick={handleAddButton}
                      >
                        +
                      </Button>
                    }
                  />
                  <Button>Add to cart</Button>
                </div>
              </ProductDetailInfo>
            </Col>
          </Row>
          <Divider />
          <ProductDetailReTitle>Related Products</ProductDetailReTitle>
          <div style={{ background: "#fff", padding: "1rem" }}>
            <Row gutter={[16, 16]}>
              {allProducts
                .filter((item) => item.id !== id)
                .slice(0, 4)
                .map((item) => (
                  <Col span={6} key={item.id}>
                    <Link to={`/shop/${item.id}`}>
                      <ProductItem item={item} />
                    </Link>
                  </Col>
                ))}
            </Row>
          </div>
        </>
      )}
    </ProductDetailWrapper>
  );
};

export default ProductDetail;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import { getCart } from "./cartHelpers";
import Card from "./Card";
import Checkout from "./Checkout";

import Copyright from "./Copyright";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const showItems = (items) => {
    return (
      <div>
        <h2>Giỏ hàng bạn có {`${items.length}`} sản phẩm</h2>
        <hr />
        {items.map((product, i) => (
          <Card
            key={i}
            product={product}
            showAddToCartButton={false}
            cartUpdate={true}
            showRemoveProductButton={true}
            setRun={setRun}
            run={run}
          />
        ))}
      </div>
    );
  };

  const noItemsMessage = () => (
    <h2>
      Giỏ hàng trống. <br /> <Link to="/shop">Tiếp tục mua sắm</Link>
    </h2>
  );

  return (
    <Layout
      title="Trang giỏ hàng"
      description="Quản lý các mặt hàng trong giỏ hàng của bạn. Thêm loại bỏ thanh toán hoặc tiếp tục mua sắm."
      className="container-fluid"
    >
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-4">
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>
        <div className="col-md-4">
          <h2 className="mb-4">Tóm tắt giỏ hàng của bạn</h2>
          <hr />
          <Checkout products={items} setRun={setRun} run={run} />
        </div>
        <div className="col-md-2"></div>
      </div>
      <Copyright />
    </Layout>
  );
};

export default Cart;

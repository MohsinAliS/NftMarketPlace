import loadProvider from "utils/loadProvider";
import React, { useState } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroup,
  Modal,
  Row,
  Col,
} from "reactstrap";
const SellModal = ({
  open,
  close,
  address,
  createMarketItemFunc,
  setSalePrice,
}) => {
  const [inputprice, setinPutSalePrice] = useState("");
  const handleSale = () => {
    setSalePrice(inputprice);
    createMarketItemFunc();
  };
  console.log("sellmodal", open);
  // console.log("price", price);

  return (
    <>
      <Row>
        <Col md="4">
          {/* <Button
            block
            color="default"
            onClick={() => setModalFormOpen(true)}
            type="button"
          >
            Form
          </Button> */}
          <Modal isOpen={open} toggle={close}>
            <div className=" modal-body p-0">
              <Card className=" bg-secondary shadow border-0">
                <CardBody className=" px-lg-5 py-lg-5">
                  <div className=" text-center text-muted mb-4">
                    <small>Or sign in with credentials</small>
                  </div>
                  <Form role="form">
                    <FormGroup className=" mb-3">
                      <InputGroup className=" input-group-alternative">
                        <Input
                          placeholder="Amount"
                          type="text"
                          onChange={(e) => setinPutSalePrice(e.target.value)}
                        ></Input>
                      </InputGroup>
                    </FormGroup>

                    {/* <div className=" custom-control custom-control-alternative custom-checkbox">
                      <input
                        className=" custom-control-input"
                        id=" customCheckLogin"
                        type="checkbox"
                      ></input>
                      <label
                        className=" custom-control-label"
                        htmlFor=" customCheckLogin"
                      >
                        <span>Remember me</span>
                      </label>
                    </div> */}
                    <div className=" text-center">
                      <Button
                        className=" my-4"
                        color="primary"
                        type="button"
                        onClick={handleSale}
                      >
                        Sell Now
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </div>
          </Modal>
        </Col>
      </Row>
    </>
  );
};

export default SellModal;

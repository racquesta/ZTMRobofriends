import React, { Fragment } from "react";
import Card from "./Card";

const CardList = ({ robots }) => {
  return (
    <Fragment>
      {robots.map(({ id, name, email }, index) => (
        <Card key={index} id={id} name={name} email={email} />
      ))}
    </Fragment>
  );
};

export default CardList;

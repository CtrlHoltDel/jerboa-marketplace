import React from "react";
import { useParams } from "react-router-dom";

const Company = () => {
  const { businessId } = useParams();

  return <div>Company ID: {businessId}</div>;
};

export default Company;

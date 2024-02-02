import React from "react";
import { Link } from "react-router-dom";

export default function Category() {
  return (
    <div>
      <Link to={`/category/CategoryA`}>카테고리 A</Link>
      <Link to={`/category/CategoryB`}>카테고리 B</Link>
      <Link to={`/category/CategoryC`}>카테고리 C</Link>
      <Link to={`/category/CategoryD`}>카테고리 D</Link>
    </div>
  );
}

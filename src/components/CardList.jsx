import React, { useState, useEffect } from "react";
import Card from "./Card";
import Button from "./Button";

const CardList = ({ data }) => {
  const limit = 12;
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState(data);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Extract unique tags from all products
  const getAllUniqueTags = () => {
    const allTags = [];
    allProducts.forEach(product => {
      if (product.tags && product.tags.length > 0) {
        product.tags.forEach(tag => {
          if (tag.title && !allTags.includes(tag.title)) {
            allTags.push(tag.title);
          }
        });
      }
    });
    return allTags.slice(0, 20);
  };

  const uniqueTags = getAllUniqueTags();

  // Filter products
  const filterByTags = (term) => {
    setSearchTerm(term);
    setLoading(true);
    setTimeout(() => {
      if (term.trim() === "") {
        setAllProducts(data);
      } else {
        const filtered = data.filter(product => {
          if (!product.tags) return false;
          return product.tags.some(tag => 
            tag.title && tag.title.toLowerCase().includes(term.toLowerCase())
          );
        });
        setAllProducts(filtered);
      }
      setOffset(0);
      setLoading(false);
    }, 100);
  };

  const handlePrevious = () => {
    if (offset - limit >= 0) {
      setOffset(offset - limit);
      window.scrollTo(0, 0);
    }
  };

  const handleNext = () => {
    if (offset + limit < allProducts.length) {
      setOffset(offset + limit);
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    setProducts(allProducts.slice(offset, offset + limit));
  }, [offset, allProducts, limit]);

  const isPrevDisabled = offset === 0;
  const isNextDisabled = offset + limit >= allProducts.length;
  const totalPages = Math.ceil(allProducts.length / limit);
  const currentPage = Math.floor(offset / limit) + 1;

  if (loading && allProducts.length === 0) {
    return (
      <div className="flex justify-center items-center vh-100">
        <div className="f3">Loading amazing artwork...</div>
      </div>
    );
  }

  return (
    <div className="cf pa2">
      {/* Search Bar */}
      <div className="flex justify-center pa3">
        <input
          type="text"
          placeholder="Filter by tags (e.g., abstract, nature, blue, texture)..."
          className="pa2 br2 ba b--light-silver w-50"
          value={searchTerm}
          onChange={(e) => filterByTags(e.target.value)}
          style={{ fontSize: "16px", outline: "none" }}
        />
      </div>

      {/* Tag buttons for quick filter */}
      {uniqueTags.length > 0 && (
        <div className="flex flex-wrap justify-center pa2">
          <button
            onClick={() => filterByTags("")}
            className={`m1 pa2 br2 pointer ${searchTerm === "" ? "bg-dark-blue white" : "bg-light-gray"}`}
            style={{ margin: "4px" }}
          >
            All ({data.length})
          </button>
          {uniqueTags.slice(0, 15).map(tag => (
            <button
              key={tag}
              onClick={() => filterByTags(tag)}
              className={`m1 pa2 br2 pointer ${searchTerm === tag ? "bg-dark-blue white" : "bg-light-gray"}`}
              style={{ margin: "4px" }}
            >
              #{tag}
            </button>
          ))}
        </div>
      )}

      {/* Search Results Info */}
      {searchTerm && (
        <div className="tc pa2 bg-light-yellow br3 mh3">
          Showing results for: <strong>"{searchTerm}"</strong>
          <button
            onClick={() => filterByTags("")}
            className="ml2 bg-red white bn br2 ph2 pv1 pointer"
          >
            Clear
          </button>
        </div>
      )}

      {/* Product Grid */}
      <div className="mt2 mb2 flex flex-wrap justify-center">
        {products.length === 0 ? (
          <div className="tc pa5">
            <p className="f3">No products found with those tags.</p>
            <button
              onClick={() => filterByTags("")}
              className="bg-blue white bn br2 ph3 pv2 pointer mt3"
            >
              Show All Products
            </button>
          </div>
        ) : (
          products.map((product) => (
            <Card key={product.id} product={product} />
          ))
        )}
      </div>

      {/* Pagination Controls */}
      {allProducts.length > limit && (
        <div className="flex items-center justify-center pa4">
          <Button text="← Previous" handleClick={handlePrevious} disabled={isPrevDisabled} />
          <span className="ml3 mr3 f6 gray">
            Page {currentPage} of {totalPages}
          </span>
          <Button text="Next →" handleClick={handleNext} disabled={isNextDisabled} />
        </div>
      )}

      {/* Product Counter */}
      <div className="tc gray mt2 mb4 f6">
        Showing {products.length} of {allProducts.length.toLocaleString()} products
      </div>
    </div>
  );
};

export default CardList;
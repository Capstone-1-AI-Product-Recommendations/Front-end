import React, { useState, useEffect } from "react";
import { useSearchParams, useParams } from "react-router-dom"; // Import useParams
import Filter from "../../Components/client/Search/Filter/Filter";
import SearchResults from "../../Components/client/Search/SearchResults/SearchResults";
import productService from '../../services/productService';
import "./Search.css";

const Search = () => {
  const [searchParams] = useSearchParams();
  const { subcategory } = useParams(); // Get subcategory from URL params
  const keyword = searchParams.get("keyword") || subcategory; // Use subcategory if keyword is not present

  const [filters, setFilters] = useState({
    searchTerm: keyword,
    subcategories: [],
    cities: [],
    minPrice: 0,
    maxPrice: 20000000,
    rating: null,
  });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let data;
        if (subcategory) {
          data = await productService.filterSubcategory(subcategory);
          console.log("Duyet thanh cong cho filter sub:", data);
        } else {
          data = await productService.filterProducts(filters);
        }
        console.log("Duyet thanh cong:", data);
        setProducts(data.products);
        setError(null);
      } catch (err) {
        setError('Không thể tìm thấy sản phẩm');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters, subcategory]);
  console.log("Data", products);
  const handleFilterChange = (newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  return (
    <div className="search-page">
      {/* Main content with filter and results */}
      <div className="search-content">
        {/* Left sidebar with filters */}
        {!subcategory && (
          <div className="search-sidebar">
            <Filter onFilterChange={handleFilterChange} />
          </div>
        )}

        {/* Right side with search results and product search */}
        <div className="search-main">
          <div className="product-search-section">
            <SearchResults products={products} loading={loading} error={error} />
          </div>

          <div className="search-results-header">
            <div className="search-keyword">
              Kết quả tìm kiếm cho từ khóa "{keyword}"
            </div>
            {/* Add sort options here */}
          </div>

          <div className="search-results-section">
            {/* Nếu bạn muốn hiển thị thêm thông tin ở đây, có thể thêm */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;

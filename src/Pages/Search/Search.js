import React from "react";
import { useSearchParams } from "react-router-dom";
import Filter from "../../Components/client/Search/Filter/Filter";
import ProductSearch from "../../Components/client/Search/ProductSearch/ProductSearch";
import SearchResults from "../../Components/client/Search/SearchResults/SearchResults";
import "./Search.css";

const Search = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");

  return (
    <div className="search-page">
      {/* Main content with filter and results */}
      <div className="search-content">
        {/* Left sidebar with filters */}
        <div className="search-sidebar">
          <Filter />
        </div>

        {/* Right side with search results and product search */}
        <div className="search-main">
          <div className="product-search-section">
            {/* <ProductSearch /> */}
          </div>

          <div className="search-results-header">
            <div className="search-keyword">
              Kết quả tìm kiếm cho từ khóa "{keyword}"
            </div>
            {/* Add sort options here */}
          </div>

          <div className="search-results-section">
            <SearchResults keyword={keyword} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;

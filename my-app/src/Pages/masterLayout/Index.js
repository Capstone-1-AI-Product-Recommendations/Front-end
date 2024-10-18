import { memo } from 'react';
import Header from '../../Components/Header/Header'; // Đường dẫn tới Header
import Footer from '../../Components/Footer/Footer'; // Đường dẫn tới Footer

const MasterLayout = ({ children, ...props }) => {
  return (
    <div {...props}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

// Memoize MasterLayout để tối ưu hiệu năng
export default memo(MasterLayout);

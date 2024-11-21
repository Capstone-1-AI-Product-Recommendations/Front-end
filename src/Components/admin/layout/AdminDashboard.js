const AdminDashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState('dashboard');
  const [breadcrumbs, setBreadcrumbs] = useState(['Home']);

  // Thêm hàm xử lý breadcrumb
  const handleMenuClick = (menuId) => {
    setSelectedMenu(menuId);
    const menuItem = menuItems.find(item => item.id === menuId);
    setBreadcrumbs(['Home', menuItem.label]);
  };

  // Thêm component Breadcrumb
  const Breadcrumb = () => (
    <div className="breadcrumb">
      {breadcrumbs.map((item, index) => (
        <React.Fragment key={index}>
          <span className="breadcrumb-item">{item}</span>
          {index < breadcrumbs.length - 1 && (
            <span className="breadcrumb-separator">/</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="sidebar">
        {/* ... sidebar code ... */}
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${selectedMenu === item.id ? 'active' : ''}`}
              onClick={() => handleMenuClick(item.id)}
            >
              <item.icon style={{ color: item.color }} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-header">
          <div className="header-info">
            <Breadcrumb />
            <h2>{menuItems.find(item => item.id === selectedMenu)?.label}</h2>
            <p>Xem tổng quan và quản lý hệ thống của bạn</p>
          </div>
          {/* ... rest of the header ... */}
        </div>
        {/* ... rest of the content ... */}
      </div>
    </div>
  );
}; 
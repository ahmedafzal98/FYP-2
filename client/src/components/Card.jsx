export const DisplayCard = ({ children, className = "", ...props }) => (
  <div
    className={`bg-white rounded shadow-sm border border-gray-200 p-4 ${className}`}
    {...props}
  >
    {children}
  </div>
);

export const CardContent = ({ children, className = "", ...props }) => (
  <div className={`space-y-2 ${className}`} {...props}>
    {children}
  </div>
);

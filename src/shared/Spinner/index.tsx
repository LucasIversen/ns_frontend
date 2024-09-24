import "./spinner.css";

const Spinner = () => {
  return (
    <div className="spinner-backdrop">
      <div className="spinner-container">
        <div className="field-goal">
          <svg
            width="100"
            height="150"
            viewBox="0 0 200 300"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="15" y="0" width="5" height="150" fill="#FAF9F6" />
            <rect x="180" y="0" width="5" height="150" fill="#FAF9F6" />
            <rect x="95" y="150" width="5" height="70" fill="#FAF9F6" />
            <rect x="100" y="150" width="85" height="5" fill="#FAF9F6" />
            <rect x="15" y="150" width="85" height="5" fill="#FAF9F6" />
            <rect x="92.5" y="220" width="15" height="80" fill="#FAF9F6" />
          </svg>
        </div>
        <div className="football">
          <svg
            width="25"
            height="15"
            viewBox="0 0 479.15729 271.46915"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#80561b"
              d="M220.21812.57398c97.219-6.261 201.144 38.968 255.304 122.529 19.273 29.735-43.39 78.156-63.825 93.52-42.576 32.007-94.626 50.303-147.614 54.14-96.037 6.955-211.921-37.652-261.591-125.506-16.446-29.089 53.148-79.429 72.953-93.819 42.375-30.791 92.648-47.507 144.773-50.864"
            />
            <path
              fill="#fff"
              d="M345.62512 117.94798v14.162h-46.578v-14.162h-8.181v14.162h-46.579v-14.162h-8.182v14.162h-46.578v-14.162h-8.182v14.162h-46.578v-14.162h-8.183v37.136h8.183v-14.791h46.578v14.791h8.182v-14.791h46.578v14.791h8.182v-14.791h46.579v14.791h8.181v-14.791h46.578v14.791h8.182v-37.136h-8.182z"
            />
          </svg>
        </div>
        <div className="loading-text">Loading...</div>
      </div>
    </div>
  );
};

export default Spinner;

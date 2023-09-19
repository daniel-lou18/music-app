function ArtistIcon({ onClick }) {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      enableBackground="new 0 0 20 20"
      height="33"
      viewBox="0 0 20 20"
      width="33"
      fill="darkgrey"
    >
      <g>
        <rect fill="none" height="20" width="20" />
      </g>
      <g>
        <g>
          <path d="M10,2c-4.42,0-8,3.58-8,8s3.58,8,8,8s8-3.58,8-8S14.42,2,10,2z M10,16.5c-3.58,0-6.5-2.92-6.5-6.5 c0-0.17,0.01-0.34,0.03-0.51c2.39-0.08,3.32-2.16,3.65-2.66C7.32,6.62,7.55,6.5,7.8,6.5h4.39c0.25,0,0.48,0.12,0.62,0.33 c0.34,0.51,1.28,2.58,3.65,2.66C16.49,9.66,16.5,9.83,16.5,10C16.5,13.58,13.58,16.5,10,16.5z" />
          <circle cx="7.5" cy="10.5" r="1" />
          <circle cx="12.5" cy="10.5" r="1" />
        </g>
      </g>
    </svg>
  );
}

export default ArtistIcon;

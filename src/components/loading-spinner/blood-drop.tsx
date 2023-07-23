export function BloodDrop({
  className,
  ...props
}: React.HtmlHTMLAttributes<SVGSVGElement>) {
  return (
    <svg
      {...props}
      className={`w-5 animate-drop ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 499.99997 816.61414"
    >
      <defs>
        <radialGradient
          xlinkHref="#a"
          id="b"
          cx="1198.7987"
          cy="-54.180092"
          r="23.688101"
          fx="1198.7987"
          fy="-54.180092"
          gradientTransform="matrix(1 0 0 1.63323 0 38.146561)"
          gradientUnits="userSpaceOnUse"
        />
        <linearGradient id="a">
          <stop offset="0" stopColor="#b00000" stopOpacity="0" />
          <stop offset="1" stopColor="#b00000" />
        </linearGradient>
        <filter
          id="c"
          width="1.3984807"
          height="1.1264681"
          x="-.19924036"
          y="-.06323403"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur stdDeviation="1.4048842" />
        </filter>
      </defs>
      <g transform="translate(-12342.20724 1044.08406) scale(10.55382)">
        <path
          fill="red"
          d="M1216.83-45.241391c0 13.08256-10.6055 23.68807-23.6881 23.68807-13.0825 0-23.6881-10.60551-23.6881-23.68807 0-13.08257 23.6881-34.929952 23.6881-53.688083 0 18.741692 23.6881 40.605513 23.6881 53.688083z"
        />
        <path
          fill="url(#b)"
          d="M1216.83-45.241391c0 13.08256-10.6055 23.68807-23.6881 23.68807-13.0825 0-23.6881-10.60551-23.6881-23.68807 0-13.08257 23.6881-34.929952 23.6881-53.688083 0 18.741692 23.6881 40.605513 23.6881 53.688083z"
        />
        <path
          fill="#fff"
          d="M1204.0625-28.46875c12.4738-10.829294 9.3667-20.747748 1.5574-32.864004-6.7073-10.40663-8.0297-15.133748-10.0844-20.457319 2.9218 9.566461 5.6752 15.803058 8.2899 21.375008 5.1581 10.992175 5.54 20.900963.2371 31.946315z"
          filter="url(#c)"
        />
      </g>
    </svg>
  );
}

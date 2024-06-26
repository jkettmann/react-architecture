import classes from "./angry-face.module.css";

export function AngryFace({
  ...props
}: React.HtmlHTMLAttributes<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 660 660"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M322.754 614.747C337.088 615.447 350.09 614.1 363.021 612.384C378.258 610.363 393.276 607.196 408.031 602.725C447.25 590.847 483.558 573.249 516.391 548.598C537.389 532.834 555.978 514.659 572.255 494.067C580.917 483.108 588.336 471.352 595.151 459.211C604.276 442.962 611.232 425.78 616.244 407.852C622.77 384.509 625.348 360.653 624.88 336.459C624.791 331.828 624.234 327.207 623.943 322.581C622.867 305.458 619.971 288.652 615.475 272.088C608.825 247.603 599.141 224.419 586.256 202.567C576.508 186.032 565.082 170.738 552.519 156.226C533.567 134.342 511.57 116.052 487.354 100.364C469.786 88.9815 451.151 79.6014 431.732 71.7999C412.313 63.9985 392.28 58.2457 371.762 54.1381C364.084 52.5977 356.377 51.3358 348.598 50.3523C343.681 49.729 338.804 49.3484 333.871 49.4633C317.328 49.8516 300.903 51.3026 284.552 54.0103C260.156 58.0541 236.358 64.0981 213.291 73.0848C182.54 85.0654 153.988 100.786 128.259 121.572C111.241 135.325 96.1366 150.931 82.9809 168.329C69.6515 185.961 58.5956 204.981 49.9461 225.389C38.2822 252.909 31.85 281.629 30.0976 311.371C29.298 324.969 29.5969 338.59 31.0351 352.192C32.928 370.13 36.4532 387.728 41.6363 404.956C50.7252 435.175 64.3969 463.224 82.7561 488.932C106.309 521.906 135.205 549.214 169.683 570.582C184.757 579.921 200.544 587.858 217.051 594.306C238.175 602.559 259.865 608.785 282.398 611.863C292.167 613.199 301.922 614.629 311.806 614.739C315.867 614.785 319.926 614.747 322.754 614.747ZM139.167 87.155C135.959 87.74 133.389 89.7887 130.441 90.9663C128.842 91.6049 127.204 92.2334 125.524 92.5655C122.601 93.1453 119.648 91.1222 118.854 88.2662C117.881 84.787 118.207 81.3512 119.377 78.015C121.26 72.6429 124.532 68.4688 129.544 65.4801C140.263 59.0913 151.186 53.1009 162.474 47.8003C177.176 40.8981 192.165 34.7111 207.62 29.6455C223.348 24.4931 239.368 20.6051 255.632 17.5703C265.623 15.7056 275.682 14.4028 285.757 13.2609C292.66 12.4767 299.644 12.2212 306.597 12.0884C322.55 11.7844 338.472 12.2417 354.382 13.8152C367.977 15.1589 381.4 17.3098 394.684 20.3829C414.203 24.8967 433.231 30.9304 451.698 38.7599C478.535 50.1428 503.539 64.6601 526.828 82.138C548.961 98.7499 568.72 117.855 586.425 139.119C607.551 164.485 624.558 192.347 637.058 222.881C643.983 239.802 649.299 257.272 652.87 275.233C657.302 297.508 659.31 319.988 658.125 342.679C656.898 366.227 652.77 389.274 645.577 411.768C639.464 430.881 631.553 449.202 621.935 466.798C616.647 476.474 610.593 485.673 604.342 494.749C588.302 518.046 569.522 538.911 548.187 557.426C526.208 576.493 502.349 592.842 476.461 606.271C457.624 616.042 438.21 624.347 418.024 630.835C405.05 635.006 391.851 638.384 378.442 640.856C370.748 642.271 363.044 643.717 355.291 644.716C335.412 647.278 315.461 648.41 295.411 647.153C276.556 645.97 257.926 643.273 239.567 638.866C227.16 635.89 215 632.018 203.094 627.427C171.729 615.339 143.047 598.651 116.94 577.464C98.6017 562.584 82.4674 545.609 67.9144 527.079C45.1206 498.049 28.1357 465.916 16.7171 430.861C12.0449 416.515 8.21826 401.898 5.94475 386.997C2.04147 361.419 0.708015 335.736 3.43878 309.864C5.88088 286.687 10.5428 264.034 18.1425 242.055C24.8864 222.559 33.8374 204.011 44.7732 186.492C55.543 169.234 67.7254 153.002 81.6296 138.14C96.3128 122.44 112.105 107.941 129.657 95.4342C132.722 93.2526 135.67 90.8999 138.613 88.5498C138.942 88.2866 138.879 87.528 139.011 87.012C140.682 86.7999 142.34 86.5777 143.982 86.3657C143.242 86.3835 143.152 86.2303 143.704 85.9135C143.74 86.1306 143.778 86.3478 143.814 86.5649C142.235 86.5317 140.531 85.4869 139.167 87.155Z"
        fill="currentColor"
      />
      <path
        d="M499 429.892C498.954 430.365 498.964 431.246 498.772 432.084C497.176 439.068 493.086 444.036 486.47 446.777C483.364 448.067 480.199 447.871 477.32 445.97C475.631 444.851 474.017 443.615 472.42 442.368C464.652 436.299 456.871 430.245 449.151 424.109C436.202 413.824 422.917 403.997 409.219 394.735C395.752 385.628 381.651 377.599 366.958 370.628C347.947 361.613 328.032 355.748 307.116 353.267C289.472 351.175 271.841 351.3 254.179 353.089C245.509 353.962 236.915 355.27 228.45 357.293C215.721 360.336 203.331 364.367 192.058 371.223C188.842 373.18 185.685 375.251 182.653 377.479C169.311 387.288 156.967 398.278 145.038 409.73C141.906 412.736 139.081 416.06 136.094 419.214C134.901 420.474 133.724 421.766 132.406 422.885C131.067 424.017 129.45 424.668 127.693 424.982C122.617 425.894 119.263 423.21 118.892 418.014C118.614 414.093 119.786 410.58 121.636 407.226C124.029 402.891 126.939 398.921 130.275 395.268C135.956 389.056 141.954 383.168 148.578 377.949C156.321 371.846 164.041 365.718 171.819 359.661C183.593 350.496 196.797 343.923 210.604 338.464C225.234 332.681 240.4 328.828 255.916 326.529C279.009 323.111 302.132 323.124 325.253 326.698C353.046 330.992 379.148 340.224 404.034 353.114C430.199 366.668 453.864 383.817 475.838 403.343C482.554 409.311 488.991 415.592 495.544 421.746C497.774 423.838 498.801 426.487 499 429.892Z"
        fill="currentColor"
        className={classes.upperLip}
      />
      <path
        d="M499 429.892C498.954 430.365 498.964 431.246 498.772 432.084C497.176 439.068 493.086 444.036 486.47 446.777C483.364 448.067 480.199 447.871 477.32 445.97C475.631 444.851 474.017 443.615 472.42 442.368C464.652 436.299 456.871 430.245 449.151 424.109C436.202 413.824 422.917 403.997 409.219 394.735C395.752 385.628 381.651 377.599 366.958 370.628C347.947 361.613 328.032 355.748 307.116 353.267C289.472 351.175 271.841 351.3 254.179 353.089C245.509 353.962 236.915 355.27 228.45 357.293C215.721 360.336 203.331 364.367 192.058 371.223C188.842 373.18 185.685 375.251 182.653 377.479C169.311 387.288 156.967 398.278 145.038 409.73C141.906 412.736 139.081 416.06 136.094 419.214C134.901 420.474 133.724 421.766 132.406 422.885C131.067 424.017 129.45 424.668 127.693 424.982C122.617 425.894 119.263 423.21 118.892 418.014C118.614 414.093 119.786 410.58 121.636 407.226C124.029 402.891 126.939 398.921 130.275 395.268C135.956 389.056 141.954 383.168 148.578 377.949C156.321 371.846 164.041 365.718 171.819 359.661C183.593 350.496 196.797 343.923 210.604 338.464C225.234 332.681 240.4 328.828 255.916 326.529C279.009 323.111 302.132 323.124 325.253 326.698C353.046 330.992 379.148 340.224 404.034 353.114C430.199 366.668 453.864 383.817 475.838 403.343C482.554 409.311 488.991 415.592 495.544 421.746C497.774 423.838 498.801 426.487 499 429.892Z"
        fill="currentColor"
        className={classes.lowerLip}
      />
      <path
        d="M388.861 259.97C386.6 259.554 383.992 259.303 381.524 258.575C373.518 256.212 368.759 250.945 367.753 242.52C367.615 241.376 367.525 240.206 367.211 239.105C367.086 238.666 366.435 238.132 365.972 238.083C364.836 237.955 363.66 237.991 362.519 238.124C359.004 238.533 355.606 237.94 352.183 237.235C348.339 236.441 345.207 234.463 342.412 231.871C340.312 229.924 339.671 227.456 340.545 224.728C342.267 219.348 345.654 215.698 351.447 214.763C366.547 212.324 380.249 206.231 393.446 198.792C400.266 194.95 406.913 190.84 413.333 186.352C420.217 181.537 427.122 176.75 434.022 171.955C435.687 170.798 437.322 169.584 439.054 168.537C440.536 167.64 442.066 166.728 443.698 166.202C447.395 165.007 451.16 164.552 454.34 167.484C457.607 170.494 458.53 174.336 457.638 178.596C456.976 181.764 455.704 184.707 453.364 187.006C451.305 189.029 449.198 191.045 446.889 192.761C438.06 199.339 429.143 205.794 420.258 212.295C419.091 213.151 417.813 213.905 416.82 214.929C416.296 215.471 416.038 216.513 416.084 217.307C416.148 218.436 416.508 219.576 416.907 220.651C417.928 223.408 418.163 226.284 418.48 229.168C420.092 243.895 408.845 255.965 396.951 258.959C394.452 259.587 391.803 259.618 388.861 259.97Z"
        fill="currentColor"
      />
      <path
        d="M253.245 244.189C252.131 244.067 251.557 243.987 250.979 243.941C247.411 243.666 246.777 243.908 245.955 247.117C244.774 251.733 242.509 255.692 239.402 259.222C234.674 264.589 227.899 266.212 221.247 263.437C215.702 261.128 211.525 257.235 208.687 251.929C205.075 245.183 203.041 238.002 202.832 230.334C202.809 229.465 202.985 228.589 202.898 227.733C202.776 226.545 202.237 225.539 201.138 224.918C197.858 223.063 194.53 221.293 191.316 219.334C186.373 216.314 181.51 213.162 176.613 210.069C171.335 206.727 167.848 201.693 164.231 196.813C163.365 195.649 163.419 194.078 163.82 192.614C164.392 190.532 165.695 189.06 167.567 188.064C168.883 187.369 170.308 186.907 171.723 187.553C176.235 189.617 181.04 190.672 185.791 191.96C188.568 192.711 191.232 193.922 193.899 195.041C204.582 199.524 215.232 204.081 225.92 208.551C237.425 213.364 249.168 217.49 261.259 220.596C262.664 220.953 264.076 221.288 265.451 221.738C268.871 222.851 270.746 225.511 270.24 229.036C269.328 235.43 266.064 240.391 260.38 243.54C259.187 244.202 257.598 244.251 256.173 244.368C255.031 244.463 253.863 244.235 253.245 244.189Z"
        fill="currentColor"
      />
    </svg>
  );
}

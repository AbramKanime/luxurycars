import{r as a,u as x,o as j,j as e,a as f,b as m}from"./index-5cdd8c60.js";function g(){const[t,c]=a.useState([]),[d,n]=a.useState(!1),i=x();a.useEffect(()=>{j(m,s=>{s?(n(!0),f(s,r=>{c(r),n(!1)})):i("/account",{replace:!0})})},[]);const o=t.length>0?t.map(s=>{const{id:r,image:l,name:h,color:u}=s;return e.jsxs("div",{className:"ordered-car-container",children:[e.jsx("img",{src:l,alt:"picture of a car"}),e.jsxs("div",{className:"ordered-car-detail",children:[e.jsxs("div",{children:[e.jsx("h5",{children:h}),e.jsx("p",{children:u}),e.jsxs("p",{children:["Order #",r.slice(-6)]})]}),e.jsx("h6",{children:"status: pending"})]})]},r)}):e.jsx("p",{children:"You do not have any ordered cars yet..."});return d?e.jsx("h3",{children:"Loading..."}):o}export{g as default};

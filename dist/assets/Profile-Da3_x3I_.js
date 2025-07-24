import{d as e,c as d,j as r}from"./index-CZbbcGPa.js";const l=e.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
`,t=e.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`,a=e.div`
  background-color: #f7f7f7;
  padding: 2rem;
  text-align: center;
  border-bottom: 1px solid #e0e0e0;

  h2 {
    margin: 0;
    color: #333;
  }
`,c=e.span`
  display: inline-block;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #007bff;
  color: white;
  font-size: 2.5rem;
  line-height: 80px; /* Centra verticalmente el texto */
  margin-bottom: 1rem;
`,f=e.div`
  padding: 2rem;
`,i=e.div`
  margin-bottom: 1.5rem;

  strong {
    display: block;
    font-size: 0.9rem;
    color: #888;
    margin-bottom: 0.25rem;
  }

  p {
    margin: 0;
    font-size: 1.1rem;
    color: #333;
  }
`,m=e.p`
  background-color: #e7f3ff;
  color: #007bff;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: bold;
  display: inline-block;
`,h=()=>{var n,s;const{user:o}=d();return o?r.jsx(l,{children:r.jsxs(t,{children:[r.jsxs(a,{children:[r.jsx(c,{children:(s=(n=o.name)==null?void 0:n.charAt(0))==null?void 0:s.toUpperCase()}),r.jsx("h2",{children:"Mi Perfil"})]}),r.jsxs(f,{children:[r.jsxs(i,{children:[r.jsx("strong",{children:"Nombre:"}),r.jsx("p",{children:o.name})]}),r.jsxs(i,{children:[r.jsx("strong",{children:"Email:"}),r.jsx("p",{children:o.email})]}),r.jsxs(i,{children:[r.jsx("strong",{children:"Rol:"}),r.jsx(m,{children:o.role})]})]})]})}):r.jsx("p",{children:"Cargando perfil..."})};export{h as default};

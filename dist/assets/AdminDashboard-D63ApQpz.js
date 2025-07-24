import{d as r,m as w,r as d,j as e,y as B,u as M,L as N,H as S,F as I,E as R,a as L,b as O}from"./index-CZbbcGPa.js";const T=w`
    from {
        transform: translateY(-50px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
`,G=r.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`,H=r.div`
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
    width: 100%;
    max-width: 600px;
    position: relative;
    animation: ${T} 0.3s ease-out;
    max-height: 90vh; /* Para scroll si el contenido es largo */
    overflow-y: auto; /* Habilita scroll vertical */
`,U=r.button`
    position: absolute;
    top: 15px;
    right: 15px;
    background: none;
    border: none;
    font-size: 1.8em;
    cursor: pointer;
    color: #888;
    transition: color 0.2s ease;

    &:hover {
        color: #333;
    }
`,D=r.h2`
    color: #333;
    margin-bottom: 25px;
    text-align: center;
    font-size: 1.8em;
`,g=r.div`
    margin-bottom: 20px;

    label {
        display: block;
        margin-bottom: 8px;
        color: #555;
        font-weight: bold;
        font-size: 0.95em;
    }

    input[type='text'],
    input[type='number'],
    input[type='url'],
    textarea,
    select {
        width: 100%;
        padding: 12px 15px;
        border: 1px solid #ddd;
        border-radius: 8px;
        font-size: 1em;
        transition: border-color 0.3s ease, box-shadow 0.3s ease;
        box-sizing: border-box; /* Asegura que padding y border no aumenten el ancho */

        &:focus {
            border-color: #007bff;
            box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
            outline: none;
        }
    }

    textarea {
        resize: vertical; /* Permite redimensionar verticalmente */
        min-height: 80px;
    }
`,V=r.div`
    display: flex;
    justify-content: flex-end; /* Alinea los botones a la derecha */
    gap: 15px;
    margin-top: 30px;

    @media (max-width: 480px) {
        flex-direction: column;
        align-items: center;
    }
`,P=r.button`
    padding: 12px 25px;
    border: none;
    border-radius: 8px;
    font-size: 1em;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.1s ease;

    &:hover {
        transform: translateY(-2px);
    }

    &:active {
        transform: translateY(0);
    }

    &:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
        opacity: 0.8;
    }
`,J=r(P)`
    background-color: #28a745; /* Verde para guardar */
    color: white;

    &:hover {
        background-color: #218838;
    }
`,K=r(P)`
    background-color: #dc3545; /* Rojo para cancelar */
    color: white;

    &:hover {
        background-color: #c82333;
    }
`,h=r.div`
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
    padding: 10px;
    margin-bottom: 15px;
    border-radius: 5px;
    text-align: center;
    font-size: 0.9em;
`,Q=({onSubmit:m,initialData:a=null,onCancel:s})=>{const[t,b]=d.useState({name:"",price:"",description:"",category:"",image:""}),[i,v]=d.useState({});d.useEffect(()=>{a&&b({name:a.name||"",price:a.price||"",description:a.description||"",category:a.category||"",image:a.image||""})},[a]);const l=n=>{const{name:c,value:x}=n.target;b(j=>({...j,[c]:x}))},f=()=>{const n={};return t.name.trim()||(n.name="El nombre es requerido."),(!t.price||isNaN(t.price)||parseFloat(t.price)<=0)&&(n.price="El precio debe ser un número positivo."),t.description.trim()||(n.description="La descripción es requerida."),t.category.trim()||(n.category="La categoría es requerida."),t.image.trim()?/^https?:\/\/.+\.(jpg|jpeg|png|gif|svg)$/.test(t.image)||(n.image="URL de imagen inválida."):n.image="La URL de la imagen es requerida.",v(n),Object.keys(n).length===0},u=n=>{n.preventDefault(),f()?m(t):B.error("Por favor, corrige los errores del formulario.")};return e.jsx(G,{children:e.jsxs(H,{role:"dialog","aria-modal":"true","aria-labelledby":"form-title",children:[e.jsx(U,{onClick:s,"aria-label":"Cerrar formulario",children:"×"}),e.jsx(D,{id:"form-title",children:a?"Editar Producto":"Añadir Nuevo Producto"}),e.jsxs("form",{onSubmit:u,children:[e.jsxs(g,{children:[e.jsx("label",{htmlFor:"name",children:"Nombre:"}),e.jsx("input",{type:"text",id:"name",name:"name",value:t.name,onChange:l,placeholder:"Nombre del producto","aria-required":"true"}),i.name&&e.jsx(h,{children:i.name})]}),e.jsxs(g,{children:[e.jsx("label",{htmlFor:"price",children:"Precio:"}),e.jsx("input",{type:"number",id:"price",name:"price",value:t.price,onChange:l,step:"0.01",min:"0",placeholder:"Ej: 19.99","aria-required":"true"}),i.price&&e.jsx(h,{children:i.price})]}),e.jsxs(g,{children:[e.jsx("label",{htmlFor:"description",children:"Descripción:"}),e.jsx("textarea",{id:"description",name:"description",value:t.description,onChange:l,rows:"4",placeholder:"Descripción detallada del producto","aria-required":"true"}),i.description&&e.jsx(h,{children:i.description})]}),e.jsxs(g,{children:[e.jsx("label",{htmlFor:"category",children:"Categoría:"}),e.jsx("input",{type:"text",id:"category",name:"category",value:t.category,onChange:l,placeholder:"Ingresa la categoría (Ej: Electrónica, Ropa)","aria-required":"true"}),i.category&&e.jsx(h,{children:i.category})]}),e.jsxs(g,{children:[e.jsx("label",{htmlFor:"image",children:"URL de Imagen:"}),e.jsx("input",{type:"url",id:"image",name:"image",value:t.image,onChange:l,placeholder:"https://ejemplo.com/imagen.jpg","aria-required":"true"}),i.image&&e.jsx(h,{children:i.image})]}),e.jsxs(V,{children:[e.jsx(K,{type:"button",onClick:s,"aria-label":"Cancelar",children:"Cancelar"}),e.jsx(J,{type:"submit","aria-label":a?"Guardar cambios":"Añadir producto",children:a?"Guardar Cambios":"Añadir Producto"})]})]})]})})},W=w`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`,X=w`
    from {
        transform: translateY(-50px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
`,Z=r.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    animation: ${W} 0.3s ease-out;
`,_=r.div`
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    text-align: center;
    max-width: 400px;
    width: 90%;
    animation: ${X} 0.3s ease-out;
    position: relative;
`,ee=r.p`
    font-size: 1.1em;
    color: #333;
    margin-bottom: 25px;
    line-height: 1.5;
`,re=r.div`
    display: flex;
    justify-content: center;
    gap: 15px;

    @media (max-width: 480px) {
        flex-direction: column;
        gap: 10px;
    }
`,F=r.button`
    padding: 12px 25px;
    border-radius: 8px;
    border: none;
    font-size: 1em;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.1s ease;

    &:hover {
        transform: translateY(-2px);
    }

    &:active {
        transform: translateY(0);
    }
`,oe=r(F)`
    background-color: #e74c3c; /* Rojo para confirmar acción destructiva */
    color: white;

    &:hover {
        background-color: #c0392b;
    }
`,te=r(F)`
    background-color: #ccc; /* Gris para cancelar */
    color: #333;

    &:hover {
        background-color: #b3b3b3;
    }
`,ae=({isOpen:m,message:a,onConfirm:s,onCancel:t})=>m?e.jsx(Z,{children:e.jsxs(_,{role:"dialog","aria-modal":"true","aria-labelledby":"modal-message",children:[e.jsx(ee,{id:"modal-message",children:a}),e.jsxs(re,{children:[e.jsx(oe,{onClick:s,"aria-label":"Confirmar acción",children:"Confirmar"}),e.jsx(te,{onClick:t,"aria-label":"Cancelar acción",children:"Cancelar"})]})]})}):null,ne=r.div`
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
`,ie=r.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    flex-wrap: wrap; // Asegura que los elementos se envuelvan en pantallas pequeñas
    gap: 1rem; // Espacio entre elementos
`,se=r.h2`
    color: #333;
    margin: 0;
    font-size: 1.8em;

    @media (max-width: 768px) {
        width: 100%; 
        text-align: center;
    }
`,ce=r.button`
    background-color: #007bff;
    color: white;
    padding: 10px 15px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s ease, transform 0.2s ease;
    display: flex;
    align-items: center;
    gap: 8px;

    &:hover {
        background-color: #0056b3;
        transform: translateY(-2px);
    }

    &:active {
        transform: translateY(0);
    }

    &:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
    }
`,de=r.div`
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
    padding: 10px;
    margin-bottom: 15px;
    border-radius: 5px;
    text-align: center;
    animation: fadeIn 0.5s ease-out;

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`,le=r.div`
    overflow-x: auto; 
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
    margin-bottom: 2rem;
`,me=r.table`
    width: 100%;
    border-collapse: collapse;
    min-width: 600px; 

    th, td {
        border-bottom: 1px solid #eee;
        padding: 12px;
        text-align: left;
        vertical-align: middle;
    }

    th {
        background-color: #f8f9fa;
        color: #555;
        font-weight: bold;
        text-transform: uppercase;
        font-size: 0.9em;
    }

    tr:last-child td {
        border-bottom: none;
    }

    tbody tr:hover {
        background-color: #f5f5f5;
    }
`,pe=r.img`
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 4px;
    margin-right: 10px;
    vertical-align: middle;
`,A=r.button`
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 8px;
    font-weight: bold;
    transition: background-color 0.2s ease, transform 0.1s ease;
    white-space: nowrap; // Evita que el texto del botón se rompa
    display: inline-flex;
    align-items: center;
    gap: 5px;

    &:last-child {
        margin-right: 0;
    }

    &:hover {
        transform: translateY(-1px);
    }
`,ue=r(A)`
    background-color: #ffc107;
    color: #333;

    &:hover {
        background-color: #e0a800;
    }
`,xe=r(A)`
    background-color: #dc3545;
    color: white;

    &:hover {
        background-color: #c82333;
    }
`,ge=r.div`
    text-align: center;
    padding: 50px 20px;
    background: #fdfdfd;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    color: #555;
    margin-bottom: 2rem;

    h3 {
        color: #777;
        margin-bottom: 10px;
    }

    p {
        font-size: 1.1em;
    }
`,he=r.div`
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
    padding: 15px;
    margin-bottom: 20px;
    border-radius: 5px;
    text-align: center;
`,fe=()=>{const{products:m,loading:a,error:s,addProduct:t,updateProduct:b,deleteProduct:i,fetchProducts:v}=M(),[l,f]=d.useState(!1),[u,n]=d.useState(null),[c,x]=d.useState(null),[j,k]=d.useState("");d.useEffect(()=>{},[s,a]);const y=o=>{k(o),setTimeout(()=>k(""),3e3)},C=(o=null)=>{n(o),f(!0)},E=()=>{n(null),f(!1)},z=async o=>{let p;u?(p=await b(u.id,o),y(p.success?"✅ Producto actualizado con éxito":`❌ Error: ${p.error}`)):(p=await t(o),y(p.success?"✅ Producto agregado con éxito":`❌ Error: ${p.error}`)),E()},q=o=>{x(o)},$=async()=>{if(c){const o=await i(c.id);y(o.success?"🗑️ Producto eliminado con éxito":`❌ Error: ${o.error}`),x(null)}},Y=()=>{v()};return a?e.jsx(N,{message:"Cargando productos para el panel de administración..."}):e.jsxs(ne,{children:[e.jsxs(S,{children:[e.jsx("title",{children:"Panel de Administración - Mi Tienda Online"}),e.jsx("meta",{name:"description",content:"Gestiona productos de tu tienda online: añade, edita y elimina productos."}),e.jsx("link",{rel:"canonical",href:"http://www.mitiendaonline.com/admin"})]}),e.jsxs(ie,{children:[e.jsx(se,{children:"Gestión de Productos"}),e.jsxs(ce,{onClick:()=>C(),children:[e.jsx(I,{})," Añadir Nuevo Producto"]})]}),j&&e.jsx(de,{children:j}),s?e.jsx(he,{children:e.jsx(R,{message:s,onRetry:Y})}):m.length===0?e.jsxs(ge,{children:[e.jsx("h3",{children:"No hay productos disponibles"}),e.jsx("p",{children:"¡Es un buen momento para añadir el primero!"})]}):e.jsx(le,{children:e.jsxs(me,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Imagen"}),e.jsx("th",{children:"Nombre"}),e.jsx("th",{children:"Precio"}),e.jsx("th",{children:"Acciones"})]})}),e.jsx("tbody",{children:m.map(o=>e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(pe,{src:o.image,alt:o.name})}),e.jsx("td",{children:o.name}),e.jsxs("td",{children:["$",parseFloat(o.price).toFixed(2)]}),e.jsxs("td",{children:[e.jsxs(ue,{onClick:()=>C(o),"aria-label":`Editar ${o.name}`,children:[e.jsx(L,{})," Editar"]}),e.jsxs(xe,{onClick:()=>q(o),"aria-label":`Eliminar ${o.name}`,children:[e.jsx(O,{})," Eliminar"]})]})]},o.id))})]})}),l&&e.jsx(Q,{onSubmit:z,initialData:u,onCancel:E}),e.jsx(ae,{isOpen:!!c,message:`¿Estás seguro de que quieres eliminar "${c==null?void 0:c.name}"?`,onConfirm:$,onCancel:()=>x(null)})]})};export{fe as default};

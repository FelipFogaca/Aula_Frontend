import "./style.css"

//Props são os parametros da função
export default function TituloFormulario({children}){
  return(
    <h2 className="titulo-form">
      {children}
    </h2>
  )
}

 
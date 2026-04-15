import './style.css'

export default function ListaSuspensa({ itens, ...resto}){
    return (
        <select {...resto} className='lista-suspensa' defaultValue=""> 
            <option value="" disabled>Selecione uma opção</option>
            
            {itens.map(function(item){
                return <option key={item.id} value={item.id}>
                  {item.nome}
                </option>
            })}
            
        </select>
    );
}


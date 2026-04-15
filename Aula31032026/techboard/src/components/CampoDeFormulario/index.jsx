import './style.css'

export default function CampoDeFormulario({children}){
    return (
        <fieldset className='campo-form'>
            {children}
        </fieldset>
    );
}
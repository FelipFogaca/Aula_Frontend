import TituloFormulario from '../TituloFormulario'
import CampoDeFormulario from '../CampoDeFormulario'
import CampoDeEntrada from '../CampoDeEntrada';
import Label from '../Label';
import Botao from '../Botao'
import ListaSuspensa from '../ListaSuspensa'
import './style.css'

export default function FormularioDeEvento({ temas, aoSubmeter }) {

  function aoFormSubmeter(formData) {
    console.log('Olá, vamos criar um novo card');
    console.log(temas, aoSubmeter);
    const evento = {
      capa: formData.get('capa') || null,
      tema: temas.find(function (item) {
        return item.id == formData.get('tema')
      }),
      data: new Date(formData.get('dataEvento')),
      titulo: formData.get('nomeEvento')
    }
    aoSubmeter(evento)
  }

  return (
    <form className="form-evento" action={aoFormSubmeter}>
      <TituloFormulario>
        Prencha para criar um evento
      </TituloFormulario>
      <div className='campos'>
        <CampoDeFormulario>
          <Label htmlFor="nome">
            Qual é o nome do evento?
          </Label>
          <CampoDeEntrada
            type="text"
            id="nomeEvento"
            placeholder="Digite o nome do evento"
            name="nomeEvento">
          </CampoDeEntrada>
        </CampoDeFormulario>
        <CampoDeFormulario>
          <Label htmlFor="capa">
            Qual o endereço da imagem da capa
          </Label>
          <CampoDeEntrada
            type="text"
            id="capa"
            placeholder="http://..."
            name="capa"
          />
        </CampoDeFormulario>
        <CampoDeFormulario>
          <Label htmlFor="dataEvento">
            Data do evento
          </Label>
          <CampoDeEntrada
            type="date"
            id="dataEvento"
            name="dataEvento"
          />
        </CampoDeFormulario>
        <CampoDeFormulario>
          <Label htmlFor="tema">
            Tema do evento
          </Label>
          <ListaSuspensa id="tema" name="tema" itens={temas} />
        </CampoDeFormulario>

      </div>
      <div className='acoes'>
        <Botao>Criar Evento</Botao>
      </div>
    </form>
  );
}
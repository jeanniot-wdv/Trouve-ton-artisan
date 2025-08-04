import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function CardStep(props) {
  return (
    <Card className='h-100'>
    <img src="..." class="card-img-top" alt="..."/>
    <div class="card-body">
      <h5 class="card-title">Etape {props.step}</h5>
      <p class="card-text">{props.title}</p>
    </div>
    <div class="card p-3 m-2">
      <small class="text-body-secondary">{props.description}</small>
    </div>
    </Card>
  );
}

export default CardStep;
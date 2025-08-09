import Card from 'react-bootstrap/Card';

function CardStep(props) {
  return (
    <Card className='h-100 justify-content-start'>
    <img src="https://placehold.co/400x300?text=Hello\nWorld" class="card-img-top" alt="..."/>
    <div class="card-body">
      <h5 class="card-title">Étape {props.step}</h5>
      <p class="card-text">{props.title}</p>
      <div class="">
        <small class="text-body-secondary">{props.description}</small>
      </div>
    </div>
    </Card>
  );
}

export default CardStep;
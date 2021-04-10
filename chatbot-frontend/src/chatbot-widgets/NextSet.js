
import '../components/App.css';
import Button from 'react-bootstrap/Button';
export default function NextSet(props) {
    return (
        <div>
            <Button variant="outline-light" onClick={()=>props.actionProvider.handleNext()}>Ask another question</Button>
        </div>
    )
}

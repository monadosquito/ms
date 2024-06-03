import cs from './App.module.css'
import { Test } from './components/Test';


const App = () => {

    return (
        <main>
            <Test elemClass={cs.root__test} />
        </main>
    )
}

export default App;

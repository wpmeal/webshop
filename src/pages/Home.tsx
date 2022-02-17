
import Login from '../components/Login';
import Products from '../components/Products';

export default function Home(props: any) {

    return (
        <div className="wrapper">
            <header>
                <h2> Home  </h2>
                <div>&nbsp;</div>
                <div>
                    <Login />
                </div>

            </header>
            <main>
                <Products />
            </main>
        </div>
    );
}

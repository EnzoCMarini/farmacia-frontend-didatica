import type { JSX } from "react";
import Navegacao from "../../components/Navegacao/Navegacao";
 
function PHome(): JSX.Element {
    return (
        <div className="min-h-screen flex flex-col">
            <Navegacao />
        </div>
    );
}

export default PHome;
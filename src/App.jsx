import module from './App.module.css';
import { useEffect, useState } from "react";
import { evaluate, round } from 'mathjs'

export default function App() {
    const [numbers, setNumbers] = useState([]);
    const [result, setResult] = useState("");

    useEffect(() => {
        if (numbers.length > 0) {
            setResult(numbers);
            console.log(numbers);
        }
    }, [numbers]);

    const handleClick = (e) => {
        setNumbers((prevNumbers) => [...prevNumbers, e.target.id]);
    };

    const extractNumber = (str, type) => {
        const regex = new RegExp(`${type}(\\d+\\.?\\d*)[*/+\\-]?`);
        const match = str.match(regex);
        return match ? match[1] : null;
    };

    const handleClickCalcul = () => {
        try {
            let str = numbers.join('');
            str = str.replace(/÷/g, '/').replace(/√/g, 'sqrt').replace(/²/g, 'square').replace(/π/g, 'pi');
            console.log(str);
            if (str.includes('sqrt')) {
                const number = extractNumber(str, 'sqrt');
                if (number !== null) {
                    str = str.replace(`sqrt${number}`, `sqrt(${number})`);
                }
            }
            if (str.includes('square')) {
                if (str.includes(')square')) {
                    str = str.replace(/\)square/g, ')^2');
                } else {
                    str = str.replace(/(\d+(\.\d+)?)square/g, '($1)^2');
                }
            }
            console.log(str);
            const resultValue = evaluate(str);
            const resultValueRound = round(resultValue, 10);
            setNumbers([resultValueRound.toString()]);
            setResult(resultValueRound.toString());
        } catch (error) {
            console.error("Erreur lors de l'évaluation de l'expression :", error);
            setResult("Erreur");
        }
    };

    return (
        <>
            <div className={module.container}>
                <div className={module.frame}>
                    <div className={module.result}><div className={module.resultrs}>{result}</div></div>
                    <div className={module.wrap}>
                        <div className={module.buttonwrappmaster}>
                            <button className={module.button} id="C" onClick={() => {setNumbers([]); setResult("")}}>C</button>
                            <button className={module.button} id="√" onClick={handleClick}>√</button>
                            <button className={module.button} id="²" onClick={handleClick}>²</button>
                            <button className={module.button} id="^" onClick={handleClick}>^</button>
                            <button className={module.button} id="(" onClick={handleClick}>(</button>
                            <button className={module.button} id=")" onClick={handleClick}>)</button>
                            <button className={module.button} id="π" onClick={handleClick}>π</button>
                            <button className={module.button} id="÷" onClick={handleClick}>÷</button>
                            <button className={module.button} id="7" onClick={handleClick}>7</button>
                            <button className={module.button} id="8" onClick={handleClick}>8</button>
                            <button className={module.button} id="9" onClick={handleClick}>9</button>
                            <button className={module.button} id="*" onClick={handleClick}>x</button>
                            <button className={module.button} id="4" onClick={handleClick}>4</button>
                            <button className={module.button} id="5" onClick={handleClick}>5</button>
                            <button className={module.button} id="6" onClick={handleClick}>6</button>
                            <button className={module.button} id="-" onClick={handleClick}>-</button>
                            <button className={module.button} id="1" onClick={handleClick}>1</button>
                            <button className={module.button} id="2" onClick={handleClick}>2</button>
                            <button className={module.button} id="3" onClick={handleClick}>3</button>
                            <button className={module.button} id="+" onClick={handleClick}>+</button>
                            <button className={`${module.button} ${module.bttn}`} id="0" onClick={handleClick}>0</button>
                            <button className={module.button} id="." onClick={handleClick}>.</button>
                            <button className={module.button} id="=" onClick={handleClickCalcul}>=</button>
                        </div>
                    </div>
                </div>
                <p className={module.aaa}>Made by <a href="https://github.com/Anatoleee" className={module.ahref}>Anatolee</a> </p>
            </div>
        </>
    );
}
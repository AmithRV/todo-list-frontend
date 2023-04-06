import { useNavigate } from "react-router-dom";

function Footer() {
    const navigate = useNavigate();
    return (
        <div className="footer-wrap">
            <div className="footer">
                <div>
                    <img 
                    src="./icons/home.svg" 
                    alt='' 
                    className="img-icon" 
                    onClick={()=>{navigate('/')}}
                    />
                </div>
                <div>
                    <img 
                    src="./icons/chart-dots.svg" 
                    alt='' 
                    className="img-icon" 
                    onClick={()=>{navigate('/trades')}}
                    />
                </div>
                <div>
                    <img 
                    src="./icons/list-details.svg" 
                    alt='' 
                    className="img-icon" 
                    onClick={()=>{navigate('/explore')}}
                    />
                </div>
            </div>
        </div>
    )
}

export default Footer
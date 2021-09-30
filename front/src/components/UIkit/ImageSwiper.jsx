import React from 'react';
import Swiper from 'react-id-swiper';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import 'swiper/css/swiper.css';

const ImageSwiper = (props) => {
    const dispatch = useDispatch();
    const [params] = React.useState({
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
            dynamicBullets: true
        },

        autoplay: true,
        loop: true,
        spaceBetween: 30
    });

    return (
        <Swiper {...params}>
            {props.images.map(image => (
                <div className="p-media__thumb" id={image.id} key={image.id}>
                    <img src={image.src} alt="アプリ関連情報" onClick={() => dispatch(push('/'))}/>
                </div>
                ))
            }
        </Swiper>
    )
};

export default ImageSwiper;
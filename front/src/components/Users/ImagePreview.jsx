import React from 'react';

const ImagePreview = (props) => {
  
    return (
        <div className="p-media__thumb" onClick={() => props.delete()}>
            <img src={props.preview} alt="プレビュー画像" />
        </div>
    )
};

export default ImagePreview;
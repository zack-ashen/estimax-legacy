import styles from './ImageSlides.module.scss'

import { ReactComponent as ChevronLeft } from '../../assets/ChevronLeftIcon.svg';
import { ReactComponent as ChevronRight } from '../../assets/ChevronRightIcon.svg';
import { useState } from 'react';

interface ImageSlidesProps {
    images: string[];
    small?: boolean;
}


export default function ImageSlides({ images, small }: ImageSlidesProps) {
    const [activeInd, setActiveInd] = useState(0);

    const backButton = (event: React.MouseEvent<HTMLButtonElement>) => {
        setActiveInd(prevActiveInd => prevActiveInd === 0 ? images.length - 1 : prevActiveInd - 1);

        event.stopPropagation();
        event.preventDefault();
    }

    const nextButton = (event: React.MouseEvent<HTMLButtonElement>) => {
        setActiveInd(prevActiveInd => (prevActiveInd + 1) % images.length);

        event.stopPropagation();
        event.preventDefault();
    }

    const transferImages = (ind: number) => {
        setActiveInd(images.findIndex(image => image === previewImages[ind]));
    }


    const previewImages = [...images];
    previewImages.splice(activeInd, 1);

    return (
        <div className={styles.ImageSlides}>
            <div className={styles.mainImageContainer}>
                <img src={images[activeInd]} className={styles.image} alt='project' />
                {activeInd !== images.length-1 &&
                    <button className={styles.nextButton} onClick={nextButton}><ChevronRight /></button>
                }
                {activeInd !== 0 &&
                    <button className={styles.prevButton} onClick={backButton}><ChevronLeft /></button>
                }
            </div>
            {!small &&
                <div className={styles.previewImages}>
                    {previewImages.map((image, index) => (
                        <img className={styles.prevImage} src={image} alt='preview project' onClick={() => transferImages(index)} key={index}/>
                    ))}
                </div>
            }
        </div>
    )
}
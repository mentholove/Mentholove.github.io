import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function ImageGallery({ images = [], alt = '' }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const open = lightboxIndex !== null;

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setLightboxIndex(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  if (!images.length) return null;

  const renderImg = (src, i, extraClass = '') => (
    <img
      src={src}
      alt={`${alt} ${i + 1}`}
      className={`w-full h-full object-cover cursor-zoom-in transition-transform duration-300 hover:scale-[1.02] ${extraClass}`}
      onClick={() => setLightboxIndex(i)}
    />
  );

  return (
    <>
      <div className="rounded-2xl overflow-hidden bg-mint-100 border border-mint-200 shadow-sm">
        {images.length === 1 ? (
          <div className="aspect-[16/9]">{renderImg(images[0], 0)}</div>
        ) : (
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={0}
            slidesPerView={1}
            className="aspect-[16/9]"
          >
            {images.map((src, i) => (
              <SwiperSlide key={src + i}>
                <div className="w-full h-full">{renderImg(src, i)}</div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              type="button"
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(null);
              }}
              aria-label="Close"
            >
              <X size={24} />
            </button>
            <motion.img
              key={images[lightboxIndex]}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              src={images[lightboxIndex]}
              alt={`${alt} ${lightboxIndex + 1}`}
              className="max-h-[90vh] max-w-[95vw] object-contain rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

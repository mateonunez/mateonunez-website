import s from './recently-played.module.css';

import config from 'lib/config';

import { ChevronUp, Container, Fade, Title, TrackCard } from 'components';
import { useCallback, useRef } from 'react';

export default function RecentlyPlayed({ items }) {
  const trackContainerRef = useRef();

  const scrollTrackContainer = useCallback(
    direction => {
      const { current } = trackContainerRef;

      if (current) {
        current.scroll({
          left:
            direction === 'left'
              ? current.scrollLeft - current.clientWidth - config.munber
              : direction === 'right'
              ? current.scrollLeft + current.clientWidth - config.munber
              : 0,
          behavior: 'smooth'
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [trackContainerRef.current]
  );

  return (
    <>
      <Container clean>
        <Fade>
          <Title>Recently Played</Title>
        </Fade>

        {items.length > 0 && (
          <div className={s.root}>
            <button
              className={s.navigator}
              onClick={() => {
                scrollTrackContainer('left');
              }}
              onTouchStart={() => {
                scrollTrackContainer('left');
              }}
              aria-label="Less Tracks">
              <ChevronUp className="w-6 h-6 font-black transition duration-500 transform -rotate-90" />
            </button>

            <div className={s['track-container']} ref={trackContainerRef}>
              {items.map((item, key) => (
                <Fade key={`${item.id}-${key}`} delay={key + config.munber / 100} clean>
                  <TrackCard item={item} delay={key + config.munber / 100} />
                </Fade>
              ))}
            </div>

            <button
              className={s.navigator}
              onClick={() => {
                scrollTrackContainer('right');
              }}
              onTouchStart={() => {
                scrollTrackContainer('right');
              }}
              aria-label="More Tracks">
              <ChevronUp className="w-6 h-6 transition duration-500 transform rotate-90 hover:scale-110" />
            </button>
          </div>
        )}
      </Container>
    </>
  );
}

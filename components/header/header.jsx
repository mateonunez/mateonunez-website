import s from './header.module.css';

import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { MN, Menu } from 'components/icons';
import cn from 'classnames';
import SocialLinks from 'components/common/social-links/social-links';
import { useUI } from 'components/ui/ui-context';

// eslint-disable-next-line no-unused-vars
const ActiveLink = ({ href, children, title }) => {
  const { pathname } = useRouter();

  return (
    <Link href={href} as={href}>
      <a
        className={`${s.link} ${pathname.split('/')[1] === href.split('/')[1] ? s.active : ''}`}
        rel="canonical"
        title={title}>
        {children}
      </a>
    </Link>
  );
};

export default function Header() {
  const { setBigBang } = useUI();
  const [mobileNavShown, setMobileNavShown] = useState(false);

  const toggle = () => setMobileNavShown(!mobileNavShown);

  return (
    <>
      <header className={s.header}>
        {/* Logo  */}
        <button
          aria-label="Home"
          onClick={() => {
            setBigBang(false);
          }}
          className={s.logo}>
          <Link href="/" passHref>
            <a aria-label="Mateo Nunez">
              <MN />
            </a>
          </Link>
        </button>

        {/* Navigation */}
        <nav className={s.desktopNav}>
          <SocialLinks />
        </nav>

        {/* Right Nav  */}
        <div className={s.rightNav}>
          {/* <SocialLinks /> */}
          <ActiveLink href="/blog" title="Blog">
            📝 Blog
          </ActiveLink>
          <ActiveLink href="/spotify" title="Spotify">
            🎧 Spotify
          </ActiveLink>
        </div>

        <button
          className={cn(
            s.toggle,
            'transform ease-linear duration-500',
            mobileNavShown && 'rotate-90'
          )}
          onClick={toggle}
          aria-label="Toggle Menu">
          <Menu />
        </button>
      </header>

      <nav className={cn(s.mobileNav, mobileNavShown && s.active)}>
        <Link href="/blog" passHref>
          <a rel="canonical" title="Blog">
            📝 Blog
          </a>
        </Link>

        <Link href="/spotify" passHref>
          <a rel="canonical" title="Blog">
            🎧 Spotify
          </a>
        </Link>
      </nav>
    </>
  );
}

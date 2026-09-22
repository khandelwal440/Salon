'use client';

import React from 'react';

export default function TeamModal({ member, isOpen, onClose }) {
  if (!isOpen || !member) return null;

  return (
    <div className="team-popup js--open">
      <div className="team-popup__inner">
        <div
          data-role-team-popup="close"
          className="team-popup__close"
          onClick={onClose}
          role="button"
          tabIndex={0}
          aria-label="Close modal"
        >
          <div className="team-popup__close-icon w-embed">
            <svg width="100%" height="100%" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M24.7487 0.707031L12.7278 12.7278M12.7278 12.7278L0.707033 24.7487M12.7278 12.7278L24.7487 24.7487M12.7278 12.7278L0.707031 0.707031"
                stroke="#E1EDBA"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
        <div className="team-popup__content">
          <div className="team-popup__top">
            <div className="team-popup__image-wrapper">
              <img src={member.image} loading="lazy" alt={member.name} className="image-cover" />
            </div>
            <div className="team-popup__info">
              <div data-role-team-popup="name" className="heading heading--l">
                {member.name}
              </div>
              <p data-role-team-popup="info-job" className="team__card-info_job">
                {member.role}
              </p>
            </div>
          </div>
          <div>
            <div className="paragraph paragraph--m" dangerouslySetInnerHTML={{ __html: member.bio }} />
          </div>
        </div>
      </div>
    </div>
  );
}

import { profile } from './profile';
import { experience } from './experience';
import { project } from './project';
import { certificate } from './certificate';
import { skill } from './skill';
import { education } from './education';
import { achievement } from './achievement';
import { hackathon } from './hackathon';
import { resume } from './resume';
import { socialLink } from './socialLink';
import { testimonial } from './testimonial';
import { service } from './service';
import { workshop } from './workshop';
import { publication } from './publication';

export const schemaTypes = [
  // Core identity
  profile,
  // Career
  experience,
  education,
  // Portfolio
  project,
  certificate,
  skill,
  // Extras
  achievement,
  hackathon,
  workshop,
  publication,
  testimonial,
  service,
  // Utility
  resume,
  socialLink,
];

import { Project, Mentor } from '../types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'drone-pollination',
    title: 'Autonomous Drone Pollination System',
    category: 'IoT & Robotics',
    categoryType: 'iot',
    description: 'Designing micro-quadcopters with computer vision to autonomously assist greenhouse cross-pollination.',
    fullMission: 'Addressing the critical agricultural pollinator decline in campus greenhouses through micro-UAVs equipped with stereo-cameras, lightweight edge AI models, and soft electrostatic brush mechanisms designed to cross-pollinate without blossom damage.',
    lookingFor: ['Embedded C++', 'Computer Vision', 'Hardware Prototyping'],
    teamCurrent: 2,
    teamTotal: 4,
    author: 'Priya S.',
    authorYear: 'Junior, ECE',
    authorDetails: 'Priya Sharma (Junior, ECE)',
    authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrGDB8R1LbC712KMOGmSYEXQ7_3_ExmM-e5HvEe1yJvJVgpOkPVy7Plkf4xbfDRzZnNZdecz5uQ7gkPhf93gRl1FhFTNt2xGuN3boCgNv3Vjdjgvgr18aqPVUlJJOGAkYQMNf5p2LGcXcaKIXrIgtBEEwbOPCKKFMHikSr6IAmxQeQ_vQOFpOC8RrQptYIGdOWYnPtgk5GuIMM3oC-kGauiDk_KRRt2QytNJ41J0beLzgbAC9np1M4',
    timeAgo: '2d ago',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9mgz-oMCqbzcQgkdCdcKZpyBdbbOOauk85nFndBfev9nWKVX3FIpWA8UnQlm4zgEKMWDkodjivJBIGAzKqLecjrFskBGlDgMuPCfm_dLYySZRkg2JdsGkmz_RNSw1w7JPTCkzGaBoNxG3xFqWAbM8X6E4r30TKD61dZXTI5bVZm6PdoeDGuVPA1VCXx6NtHJeaedoWsT-SQQ310mzRGkMSIZ7RdlWbVj0wsWNoLbXZDn1_YZHZVBt',
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwF6dMBbUUvvSCyV_3gc11ixim__mAVbtJji_z_hiuh1HIzB0BmzVp5_LlUISHRpIYxK_xOP-pYNQFYEPlU__suzmrK5EC0nSSqjPO7u5iU29Hk1A3jsRZW8C_QUsniUM5_o0VYiNGm17y3F5RkDnM87FDLmiQi-W9A2z_9hVJND5ZXGirclXw7x-dfKbt-MwgstzfVshgKLFrfnYZZJ5yBKDq3pzxeZBLpnrfvL4rGLU9Dg2K1_2s',
    mentor: {
      name: 'Prof. K. Vance',
      lab: 'Robotics Lab'
    },
    currentStage: 'Stage 2 / 3',
    milestones: [
      {
        stage: 'Phase 1',
        title: 'CAD & Propulsion',
        subtitle: 'Flight dynamic benchmark completed',
        status: 'done'
      },
      {
        stage: 'Phase 2',
        title: 'Edge AI CV Model',
        subtitle: 'Real-time stereo blossom tracking',
        status: 'active'
      },
      {
        stage: 'Phase 3',
        title: 'Field Trials',
        subtitle: 'Campus greenhouse live deployments',
        status: 'upcoming'
      }
    ],
    teamRoster: [
      {
        name: 'Priya Sharma',
        role: 'Lead',
        department: 'Hardware Architecture • ECE \'25',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrGDB8R1LbC712KMOGmSYEXQ7_3_ExmM-e5HvEe1yJvJVgpOkPVy7Plkf4xbfDRzZnNZdecz5uQ7gkPhf93gRl1FhFTNt2xGuN3boCgNv3Vjdjgvgr18aqPVUlJJOGAkYQMNf5p2LGcXcaKIXrIgtBEEwbOPCKKFMHikSr6IAmxQeQ_vQOFpOC8RrQptYIGdOWYnPtgk5GuIMM3oC-kGauiDk_KRRt2QytNJ41J0beLzgbAC9np1M4',
        icon: 'memory'
      },
      {
        name: 'Alex Rivera',
        role: 'Flight Cont.',
        department: 'Embedded Systems • ME \'26',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGmQCAhvf51V_nW2kTaTEZy5Rw_cg6-p5ec6Ihf8zflmNe3tcqVomqnCH_1WERFRtM956p-gRiDckjq2nslGgs0DEdySEwRqI6Y6fBZVYyHBZH30S_oovE-eYkGk7xFee9sbNAfUKL40uyMoqPHebevAAYc2ziDObnsh7u2ZOj7EQCtkLKKn_a0gmk4orFrp_CyBU1buTgIj_9vxPUZnYC7crpdcVummGiX2KRENwDu683dVH5ZIzh',
        icon: 'flight_takeoff'
      }
    ],
    neededRoles: [
      {
        title: 'Computer Vision Engineer',
        description: 'Requires OpenCV / PyTorch for real-time blossom segmentation, lightweight quantized edge inference, and optical flow.',
        tags: ['OpenCV', 'PyTorch', 'YOLOv8 Edge']
      },
      {
        title: 'Hardware Prototyper',
        description: 'Requires rapid 3D printing (SLA/FDM), custom PCB layout via KiCad, and lightweight electrostatic arm assembly.',
        tags: ['KiCad PCB', 'SLA 3D Print', 'Actuators']
      }
    ],
    isBookmarked: false
  },
  {
    id: 'verigrade-vault',
    title: 'VeriGrade: Decentralized Credential Vault',
    category: 'Web3 & Security',
    categoryType: 'web3',
    description: 'A tamper-proof student transcript and micro-credential verification protocol built on Ethereum L2.',
    fullMission: 'Eliminating diploma forgery and streamlining global academic transcript transfers through zero-knowledge verifiable credentials on an Optimistic Rollup L2, directly linked to accredited institutional signing keys.',
    lookingFor: ['Solidity / Smart Contracts', 'UI/UX Designer', 'Next.js'],
    teamCurrent: 3,
    teamTotal: 5,
    author: 'Marcus Chen',
    authorYear: 'Senior, CS',
    authorDetails: 'Marcus Chen (Senior, CS)',
    authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhnhSiPxEB232w2YEKHlZaFwpgtPDyCParjUi9-gBFBMVKcYf2o3YJYvfx0zCI1u5LjYlLAOXvGvXDTHcdwKESh78SUDqUHfka60TMjAI6nQfh6KTwDgQD37B5LKm_Fy91x251rXETW-LZtC3QQw6962R4_zrYK_2etCWbimAAksucQJ3RscwUxteqLMYCgPOyQcZMID4TfCHDPqqhOJHWxXDIqFlU-j4WPSrsSBVrENZpBHyP_jVL',
    timeAgo: '4h ago',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9ic0znOAmYEJLvhCzvPMAJGg7uHF4T_1VC7gukUXW7gVTO2RjnPYKWDOwKX7GYkfkjuLusNZTwB7mb_l87HsrAZDovbjaKkajvAGuCXyJU79UfX0FvYWQmZ9x07Cwu2eMr1vQTToxc8zocws8F7RLXlx8O5KT2w-vlzbdeEYNJYG8bzAvPLdf4ynkSWwyKVAlBvMLRjLKd-EksBK2Y99xEY74mGkIP94esCAXG_T5ycgi59594gC9',
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9ic0znOAmYEJLvhCzvPMAJGg7uHF4T_1VC7gukUXW7gVTO2RjnPYKWDOwKX7GYkfkjuLusNZTwB7mb_l87HsrAZDovbjaKkajvAGuCXyJU79UfX0FvYWQmZ9x07Cwu2eMr1vQTToxc8zocws8F7RLXlx8O5KT2w-vlzbdeEYNJYG8bzAvPLdf4ynkSWwyKVAlBvMLRjLKd-EksBK2Y99xEY74mGkIP94esCAXG_T5ycgi59594gC9',
    mentor: {
      name: 'Dr. Dania Patel',
      lab: 'Distributed Systems & Crypto Lab'
    },
    currentStage: 'Stage 1 / 3',
    milestones: [
      {
        stage: 'Phase 1',
        title: 'Smart Contract Architecture',
        subtitle: 'ERC-734/735 Identity contracts written & tested',
        status: 'active'
      },
      {
        stage: 'Phase 2',
        title: 'Zero-Knowledge Proof Pipeline',
        subtitle: 'Circom circuit integration for grade privacy',
        status: 'upcoming'
      },
      {
        stage: 'Phase 3',
        title: 'Registrar Pilot Integration',
        subtitle: 'Campus administration test run',
        status: 'upcoming'
      }
    ],
    teamRoster: [
      {
        name: 'Marcus Chen',
        role: 'Founder & Protocol Lead',
        department: 'Cryptography & Systems • CS \'25',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhnhSiPxEB232w2YEKHlZaFwpgtPDyCParjUi9-gBFBMVKcYf2o3YJYvfx0zCI1u5LjYlLAOXvGvXDTHcdwKESh78SUDqUHfka60TMjAI6nQfh6KTwDgQD37B5LKm_Fy91x251rXETW-LZtC3QQw6962R4_zrYK_2etCWbimAAksucQJ3RscwUxteqLMYCgPOyQcZMID4TfCHDPqqhOJHWxXDIqFlU-j4WPSrsSBVrENZpBHyP_jVL',
        icon: 'lock'
      },
      {
        name: 'Sophie Tanaka',
        role: 'Frontend Architect',
        department: 'HCI & Web Development • INFO \'26',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOirPc0AwHK7KgtfLdDn8OWzi4xZVJGv1JBYNEYVhEiWhMFzbd2cuTfnOEccy4Uri1yykjgkSfH4A30Yx5feoslCpZYWSLYuaBMcSw0eEJ1pbd21gYx7V7R3r95MoIZQn8RQE4QKLfDYA-QmaqZKpWTR5fN-x2H86Z03axnu90uE-rH4bOFHvZYRCFJkwbShK9ImZiGlzVBZgeREtPZnbl466N7m9t9gqSzR-7Oy7y_0GcMxXwslfZ',
        icon: 'code'
      }
    ],
    neededRoles: [
      {
        title: 'Solidity / Smart Contracts',
        description: 'Implement gas-optimized staking registries and verification contracts on Base / Arbitrum.',
        tags: ['Solidity', 'Foundry', 'L2 Rollups']
      },
      {
        title: 'UI/UX Designer',
        description: 'Craft high-converting student onboarding wallet flows and campus registrar portal design.',
        tags: ['Figma', 'Design Systems', 'Web3 UX']
      }
    ],
    isBookmarked: false
  },
  {
    id: 'neurofocus-eeg',
    title: 'NeuroFocus - EEG Study Assistant',
    category: 'BioTech & AI',
    categoryType: 'biotech',
    description: 'Wearable headband telemetry syncs with interactive study timer to optimize student deep-work cycles.',
    fullMission: 'Harnessing low-cost dry-electrode electroencephalogram (EEG) signals to classify cognitive load and attentional drift in real-time, syncing with ambient noise attenuation and adaptive Pomodoro intervals.',
    lookingFor: ['Python ML', 'Flutter / Mobile', 'DSP Engineer'],
    teamCurrent: 1,
    teamTotal: 3,
    author: 'Maya Vance',
    authorYear: 'Sophomore, BioE',
    authorDetails: 'Maya Vance (Sophomore, BioE)',
    authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOirPc0AwHK7KgtfLdDn8OWzi4xZVJGv1JBYNEYVhEiWhMFzbd2cuTfnOEccy4Uri1yykjgkSfH4A30Yx5feoslCpZYWSLYuaBMcSw0eEJ1pbd21gYx7V7R3r95MoIZQn8RQE4QKLfDYA-QmaqZKpWTR5fN-x2H86Z03axnu90uE-rH4bOFHvZYRCFJkwbShK9ImZiGlzVBZgeREtPZnbl466N7m9t9gqSzR-7Oy7y_0GcMxXwslfZ',
    timeAgo: '1d ago',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvRZaPooazSm35iqOEjFwKq6n6Z2w9HxMmBgBeb9KLNit51uAWY6RXgyvDbPglfLH6-Z4uo9N3tJAz3f-hcC_vbaGPRVBO65AU9jOZPNXTyfz5TyL9CGxcDX7PqwMhUAak2-uAu5sss-XpiR8dk_np22idq-0MhNiRHhhGwJ6dvOtUrJg5dP6vsq_TyMjloVuWJ35lCoz4sYx-9TPo2UKF2V76Gqd0TkqCQKzwXB7k_WDuY0zIgkpw',
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvRZaPooazSm35iqOEjFwKq6n6Z2w9HxMmBgBeb9KLNit51uAWY6RXgyvDbPglfLH6-Z4uo9N3tJAz3f-hcC_vbaGPRVBO65AU9jOZPNXTyfz5TyL9CGxcDX7PqwMhUAak2-uAu5sss-XpiR8dk_np22idq-0MhNiRHhhGwJ6dvOtUrJg5dP6vsq_TyMjloVuWJ35lCoz4sYx-9TPo2UKF2V76Gqd0TkqCQKzwXB7k_WDuY0zIgkpw',
    mentor: {
      name: 'Dr. Aris Thorne',
      lab: 'Neuroengineering & Signal Processing Lab'
    },
    currentStage: 'Stage 1 / 3',
    milestones: [
      {
        stage: 'Phase 1',
        title: 'Sensor Calibration & Filtering',
        subtitle: 'Bandpass filtering (Alpha & Theta rhythm isolation)',
        status: 'active'
      },
      {
        stage: 'Phase 2',
        title: 'Mobile BLE Telemetry App',
        subtitle: 'Bluetooth stream decoding and live visualization',
        status: 'upcoming'
      },
      {
        stage: 'Phase 3',
        title: 'User Focus Testing Study',
        subtitle: '50-student double-blind focus evaluation trial',
        status: 'upcoming'
      }
    ],
    teamRoster: [
      {
        name: 'Maya Vance',
        role: 'Research Lead',
        department: 'Neural Engineering • BioE \'27',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOirPc0AwHK7KgtfLdDn8OWzi4xZVJGv1JBYNEYVhEiWhMFzbd2cuTfnOEccy4Uri1yykjgkSfH4A30Yx5feoslCpZYWSLYuaBMcSw0eEJ1pbd21gYx7V7R3r95MoIZQn8RQE4QKLfDYA-QmaqZKpWTR5fN-x2H86Z03axnu90uE-rH4bOFHvZYRCFJkwbShK9ImZiGlzVBZgeREtPZnbl466N7m9t9gqSzR-7Oy7y_0GcMxXwslfZ',
        icon: 'psychology'
      }
    ],
    neededRoles: [
      {
        title: 'Python ML Specialist',
        description: 'Train lightweight scikit-learn / TensorFlow Lite models to classify attentional focus from FFT spectral power.',
        tags: ['Python ML', 'SciPy', 'TFLite']
      },
      {
        title: 'Flutter / Mobile Engineer',
        description: 'Build the low-latency Bluetooth Low Energy client application with smooth real-time telemetry waves.',
        tags: ['Flutter / Mobile', 'BLE', 'State Management']
      }
    ],
    isBookmarked: false
  }
];

export const INITIAL_MENTORS: Mentor[] = [
  {
    id: 'dr-aris-thorne',
    name: 'Dr. Aris Thorne',
    title: 'Assoc. Professor, Electrical & Computer Eng.',
    department: 'Robotics & Autonomous Systems Lab',
    lab: 'Robotics & Autonomous Systems Lab',
    type: 'Faculty',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDreswftHHEjrgtZRZa7pE-vLz9DzqRc8_kcVcbCGpps2BYVjrrXr3fstIARGim4aMpfdGVdbmEU-x4NgFumVVeza2sPNG_tw90pu0NtqpIt4rBhsbIt_60StolKAs-0SpGqWKQLSz0qUMi_RmVzEgu-nEBVqCvpPQqkGwchW2smkwAtaV6-mCVbPWsAqlsHfjf4yCNCOaiC5dQ2SKhAPKOXC6tgGza1_uFBPwKU3lmWed8peNAU45w',
    domains: ['Machine Learning', 'Edge Computing', 'ROS2'],
    labDomain: 'robotics autonomous systems edge computing machine learning',
    badge: 'Faculty',
    availability: 'Online now • Accepting 2 Student Teams this Term',
    availabilityTag: '2 slots',
    isOnline: true,
    status: 'Online',
    isBookmarked: false
  },
  {
    id: 'elena-rostova',
    name: 'Elena Rostova',
    title: 'Senior ML Eng @ Anthropic | Techstars',
    department: 'Alumni Network • Computer Science',
    lab: 'Alumni Network - Computer Science',
    type: 'Alumni',
    year: "'21",
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOirPc0AwHK7KgtfLdDn8OWzi4xZVJGv1JBYNEYVhEiWhMFzbd2cuTfnOEccy4Uri1yykjgkSfH4A30Yx5feoslCpZYWSLYuaBMcSw0eEJ1pbd21gYx7V7R3r95MoIZQn8RQE4QKLfDYA-QmaqZKpWTR5fN-x2H86Z03axnu90uE-rH4bOFHvZYRCFJkwbShK9ImZiGlzVBZgeREtPZnbl466N7m9t9gqSzR-7Oy7y_0GcMxXwslfZ',
    domains: ['Large Language Models', 'Distributed Systems', 'Startup Pitching'],
    labDomain: 'machine learning software engineering large language models distributed systems startup pitching',
    badge: 'Alumni',
    availability: 'In Sprint Review • Responding to async project proposals',
    availabilityTag: 'Busy',
    isOnline: false,
    status: 'Busy',
    isBookmarked: false
  },
  {
    id: 'prof-marcus-sterling',
    name: 'Prof. Marcus Sterling',
    title: 'Chair of Embedded Systems & Nanotech',
    department: 'Dept. of Microelectronics',
    lab: 'Department of Microelectronics',
    type: 'Faculty',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkgp5XKhgWMZkJx8Gzi7Cp-CL431WSKSmsbak15AiuqoNjOthmtDA2evJ5dPeLDXeTCwlSwoPW64Eaqbvq-MqIooJDj02hquf_T9V2cizWXPvedeyvHFyfCn-btnjSulSQf0jMxxG0v7ZLHKi8gr0NS9GXSqqtzYLfIqD5r8udhf9cqkfWt_O896_xKPK0d8iTKTCdICxvl1PPXitiez7Gmx7GW-a36lYQNQv1A0KCog2lSaNpoK2k',
    domains: ['Circuit Analysis', 'VLSI Design', 'FPGA Prototyping'],
    labDomain: 'circuit analysis vlsi design fpga prototyping hardware microelectronics',
    badge: 'Faculty',
    availability: 'Active Office Hours • In-Person at Room EE-402',
    availabilityTag: 'Office Hours',
    isOnline: true,
    status: 'Office Hours',
    isBookmarked: false
  },
  {
    id: 'dr-priya-nair',
    name: 'Dr. Priya Nair',
    title: 'Research Director, Neuro-Tech & Biosignals',
    department: 'Biomedical Innovation Lab',
    lab: 'Biomedical Innovation Lab',
    type: 'Faculty',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOirPc0AwHK7KgtfLdDn8OWzi4xZVJGv1JBYNEYVhEiWhMFzbd2cuTfnOEccy4Uri1yykjgkSfH4A30Yx5feoslCpZYWSLYuaBMcSw0eEJ1pbd21gYx7V7R3r95MoIZQn8RQE4QKLfDYA-QmaqZKpWTR5fN-x2H86Z03axnu90uE-rH4bOFHvZYRCFJkwbShK9ImZiGlzVBZgeREtPZnbl466N7m9t9gqSzR-7Oy7y_0GcMxXwslfZ',
    domains: ['Biomedical', 'Biosignal Processing', 'Wearables'],
    labDomain: 'biomedical biosignal processing wearables machine learning software engineering',
    badge: 'Faculty',
    availability: 'Accepting 1 Medical AI or Wearables Thesis Team',
    availabilityTag: 'Open',
    isOnline: true,
    status: 'Online',
    isBookmarked: false
  }
];

export const APP_LOGO = 'https://lh3.googleusercontent.com/aida/AEtjO1VI-BDQxBMrzl0EJUvfsIlkv5xTFIa38OCnywAaJelg1UH4sQCdq0KMnUWRmBz2ibqGS4y5TyPrQ7Tz54p-UsKD9paPCpFtmus6w04KZIxoex4Wr4yUKlonhR8YpZIRxXi6k7OPGvkwoKFx9MzGiVEPy8Mn8cJcgCn2UXpotUZuV356wGXdSdFkAn7g4Uxs3jp5lb8u31UMwxQkL-gtImzInLQpHLpo9TAZNMo1Sk-x0Qx39QnGDcX0chE';

export const USER_PROFILE_PIC = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhnhSiPxEB232w2YEKHlZaFwpgtPDyCParjUi9-gBFBMVKcYf2o3YJYvfx0zCI1u5LjYlLAOXvGvXDTHcdwKESh78SUDqUHfka60TMjAI6nQfh6KTwDgQD37B5LKm_Fy91x251rXETW-LZtC3QQw6962R4_zrYK_2etCWbimAAksucQJ3RscwUxteqLMYCgPOyQcZMID4TfCHDPqqhOJHWxXDIqFlU-j4WPSrsSBVrENZpBHyP_jVL';

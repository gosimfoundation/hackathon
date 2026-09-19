<script setup lang="ts">
// Tier mascots: Nautilus (design), King Crab (real device), Giant Octopus (ROM / system).
defineProps<{ kind: 'nautilus' | 'crab' | 'octopus'; label: string }>()
</script>

<template>
  <svg class="tier-mascot" viewBox="0 0 200 200" role="img" :aria-label="label">
    <circle class="mascot-disc" cx="100" cy="104" r="88" />

    <g v-if="kind === 'nautilus'" stroke="#2b3a40" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <!-- tentacles -->
      <g fill="none" stroke="#e3a57f" stroke-width="7">
        <path d="M58 134 q-6 16 4 24" />
        <path d="M70 138 q-2 18 10 22" />
        <path d="M46 128 q-14 10 -10 24" />
      </g>
      <!-- pencil held by a tentacle -->
      <g transform="rotate(-38 40 150)">
        <rect x="18" y="144" width="44" height="11" rx="2" fill="#f2c14e" />
        <path d="M62 144 l14 5.5 l-14 5.5 z" fill="#f6e7cf" />
        <path d="M71 147.5 l5 2 l-5 2 z" fill="#2b3a40" />
        <rect x="12" y="144" width="8" height="11" rx="2" fill="#e38b8b" />
      </g>
      <path d="M40 152 q-8 -4 -4 -12" fill="none" stroke="#e3a57f" stroke-width="7" />
      <!-- shell -->
      <circle cx="116" cy="98" r="60" fill="#f6e7cf" />
      <g fill="none" stroke="#a54e36" stroke-width="7">
        <path d="M84 48 q10 14 6 30" />
        <path d="M108 39 q8 16 2 32" />
        <path d="M134 41 q2 18 -8 32" />
        <path d="M158 56 q-6 16 -20 26" />
      </g>
      <path d="M118 100 m-8 0 a8 8 0 1 1 8 8 a18 18 0 0 1 -18 -18 a28 28 0 0 1 28 -28 a38 38 0 0 1 38 38" fill="none" stroke-width="3.5" />
      <!-- face under the hood -->
      <path d="M52 94 q8 -22 36 -18 q14 18 6 48 q-26 16 -46 0 q-6 -14 4 -30 z" fill="#edb28b" />
      <path d="M50 92 q18 -26 44 -14" fill="#8a3d2a" />
      <circle cx="70" cy="104" r="11" fill="#fff" />
      <circle cx="67" cy="105" r="6" fill="#2b3a40" stroke="none" />
      <circle cx="65" cy="102" r="2" fill="#fff" stroke="none" />
      <path d="M62 122 q7 5 14 0" fill="none" />
      <circle cx="84" cy="116" r="4" fill="#e38b8b" stroke="none" opacity=".7" />
    </g>

    <g v-else-if="kind === 'crab'" stroke="#2b3a40" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <!-- legs -->
      <g fill="none" stroke="#c4553b" stroke-width="7">
        <path d="M56 128 q-18 6 -24 26" /><path d="M60 140 q-12 10 -14 26" /><path d="M68 148 q-4 12 -2 24" />
        <path d="M144 128 q18 6 24 26" /><path d="M140 140 q12 10 14 26" /><path d="M132 148 q4 12 2 24" />
      </g>
      <!-- arms -->
      <g fill="none" stroke="#c4553b" stroke-width="8">
        <path d="M58 112 q-18 -4 -24 -24" />
        <path d="M142 112 q18 -4 24 -24" />
      </g>
      <!-- left claw -->
      <path d="M34 86 q-20 -6 -18 -26 q14 -2 22 10 q2 -18 18 -18 q4 20 -8 32 z" fill="#d9674a" />
      <!-- right claw holding a phone -->
      <rect x="150" y="34" width="30" height="50" rx="6" fill="#303e45" transform="rotate(14 165 59)" />
      <rect x="155" y="40" width="20" height="36" rx="3" fill="#8fd0c7" stroke="none" transform="rotate(14 165 59)" />
      <path d="M166 88 q20 -2 22 -20 q-12 -6 -20 4 q-6 -10 -20 -4 q0 16 18 20 z" fill="#d9674a" />
      <!-- eye stalks -->
      <path d="M88 92 l-6 -26 M112 92 l6 -26" fill="none" />
      <circle cx="81" cy="60" r="11" fill="#fff" />
      <circle cx="119" cy="60" r="11" fill="#fff" />
      <circle cx="83" cy="61" r="5.5" fill="#2b3a40" stroke="none" />
      <circle cx="117" cy="61" r="5.5" fill="#2b3a40" stroke="none" />
      <circle cx="81" cy="58" r="2" fill="#fff" stroke="none" />
      <circle cx="115" cy="58" r="2" fill="#fff" stroke="none" />
      <!-- spiky king-crab shell -->
      <path d="M50 118 q0 -34 50 -34 q50 0 50 34 q0 30 -50 30 q-50 0 -50 -30 z" fill="#d9674a" />
      <g fill="#f1a07f" stroke="none">
        <circle cx="72" cy="100" r="4" /><circle cx="88" cy="93" r="4" /><circle cx="112" cy="93" r="4" /><circle cx="128" cy="100" r="4" /><circle cx="100" cy="91" r="4" />
      </g>
      <path d="M88 124 q12 10 24 0" fill="none" />
      <circle cx="74" cy="120" r="6" fill="#f3a9a0" stroke="none" opacity=".8" />
      <circle cx="126" cy="120" r="6" fill="#f3a9a0" stroke="none" opacity=".8" />
    </g>

    <g v-else stroke="#2b3a40" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <!-- tentacles -->
      <g fill="none" stroke="#3f7482" stroke-width="13">
        <path d="M70 124 q-30 10 -40 36 q-4 14 10 12" />
        <path d="M82 134 q-12 20 -8 40" />
        <path d="M100 138 q2 22 -6 38" />
        <path d="M118 134 q14 18 10 38" />
        <path d="M130 124 q30 8 36 32 q2 14 -12 12" />
      </g>
      <g fill="#bfe3dc" stroke="none">
        <circle cx="36" cy="160" r="3" /><circle cx="44" cy="146" r="3" /><circle cx="77" cy="160" r="3" /><circle cx="97" cy="160" r="3" /><circle cx="126" cy="158" r="3" /><circle cx="162" cy="150" r="3" />
      </g>
      <!-- tentacle wrapped around a chip -->
      <rect x="148" y="70" width="36" height="36" rx="4" fill="#303e45" />
      <rect x="156" y="78" width="20" height="20" rx="2" fill="#f2c14e" stroke="none" />
      <g stroke="#303e45" stroke-width="3">
        <path d="M154 70 v-7 M166 70 v-7 M178 70 v-7 M154 106 v7 M166 106 v7 M178 106 v7" />
      </g>
      <path d="M134 110 q16 8 30 -8 q10 -12 22 -4" fill="none" stroke="#3f7482" stroke-width="13" />
      <!-- mantle -->
      <path d="M52 104 q-4 -76 48 -78 q52 2 48 78 q-6 36 -48 36 q-42 0 -48 -36 z" fill="#4f8796" />
      <g fill="#78aab5" stroke="none">
        <circle cx="80" cy="54" r="7" /><circle cx="118" cy="46" r="5" /><circle cx="128" cy="68" r="6" /><circle cx="96" cy="40" r="4" />
      </g>
      <!-- determined eyes -->
      <circle cx="82" cy="98" r="14" fill="#fff" />
      <circle cx="118" cy="98" r="14" fill="#fff" />
      <circle cx="85" cy="100" r="7" fill="#2b3a40" stroke="none" />
      <circle cx="115" cy="100" r="7" fill="#2b3a40" stroke="none" />
      <circle cx="82" cy="97" r="2.5" fill="#fff" stroke="none" />
      <circle cx="112" cy="97" r="2.5" fill="#fff" stroke="none" />
      <path d="M68 80 l24 6 M132 80 l-24 6" fill="none" stroke-width="4" />
      <path d="M90 122 q10 8 20 0" fill="none" />
    </g>
  </svg>
</template>

<style scoped>
.tier-mascot { display: block; width: 148px; height: 148px; margin: 0 0 18px -8px; }
.mascot-disc { fill: #e8dece; }
</style>

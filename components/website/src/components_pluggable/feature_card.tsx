import { JSX } from "preact/jsx-runtime";

export default function FeatureCard({ 
  icon, 
  title, 
  children 
}: { 
  icon: string; 
  title: string; 
  children: JSX.Element | string;
}) {
  return (
    <div class="card animate-fadeIn">
      <h3 class="feature-title">{icon} {title}</h3>
      <p class="feature-text">{children}</p>
    </div>
  );
}
export default function CustomFooter() {
  return (
    <footer class="mt-24 py-8 border-t border-gray-800">
      <div class="max-w-6xl mx-auto px-4 text-center">
        <p class="text-gray-500 font-light">
          Сделано с ❤️ командой, неравнодушной к "Сила{">>>"}Ветра"
        </p>
        <p class="text-gray-600 text-sm mt-2 font-light">
          © {new Date().getFullYear()} Все права защищены
        </p>
      </div>
    </footer>
  );
}


namespace Metal_Kirikot_Alpha {

    internal class Program {

        private static void Main() {

            AlphaClient alpha = new ();
            alpha.Launch().GetAwaiter().GetResult();
        }
    }
}
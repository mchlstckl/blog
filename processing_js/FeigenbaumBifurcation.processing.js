float r = 0.8;
float x = 0.5;
float e = 0.0001;

float r_lim = 4;
float x_lim = 1;

int x_max = 1000;
int y_max = 500;

float r_0 = 0;

int it = 0;

int u = x_max / r_lim;
int v = y_max / x_lim;

float c_x = 0;
float c_y = 0;

void setup()
{
    size(x_max, y_max);
    stroke(0, 0, 0, 5);
}

void draw()
{

    // Discard iterations
    for (it = 0; it < 300; it++)
    {
        x = r * x * (1 - x);
    }

    // Draw iterations
    for (it = 0; it < 500; it++)
    {
        x = r * x * (1 - x);

        c_x = (r - r_0) * u;
        c_y = x * v;

        if (r_0 > 0) point(c_x, c_y);
    }

    // Trim the start of the diagram
    if (c_y > 300 && r_0 == 0)
    {
        r_0 = r;
        u = x_max / (r_lim - r_0);
    }

    r += e;
}

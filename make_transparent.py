from PIL import Image

def make_transparent(image_path, output_path):
    img = Image.open(image_path).convert("RGBA")
    data = img.getdata()

    new_data = []
    # Using a simple flood fill or threshold for pure white (or near white)
    # The logo has a white background but maybe it's not perfectly #FFFFFF
    width, height = img.size
    center_x, center_y = width / 2, height / 2
    # Radius is likely slightly less than half the width
    # But since it's a circular badge, we can just mask it with a circle
    radius = min(width, height) / 2
    
    for y in range(height):
        for x in range(width):
            # Distance from center
            distance = ((x - center_x) ** 2 + (y - center_y) ** 2) ** 0.5
            if distance > radius - 2: # Give it a 2px margin to remove white fringe
                new_data.append((255, 255, 255, 0)) # transparent
            else:
                new_data.append(data[y * width + x])
                
    img.putdata(new_data)
    img.save(output_path, "PNG")

make_transparent("public/logo.png", "public/logo_transparent.png")
